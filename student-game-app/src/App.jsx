import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { isSameDay } from "./logic/timeUtils";

import Dashboard from "./pages/Dashboard";
import CharacterPage from "./pages/CharacterPage";
import AuthForm from "./components/AuthForm";
import AssignmentForm from "./components/AssignmentForm";
import AssignmentList from "./components/AssignmentList";
import About from "./pages/About";
import Store from "./pages/Store";
import { calculateSubmissionCoins } from "./logic/coinRules";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import ToastLayout from "./layouts/ToastLayout";

function App() {
  // Assignment/task state (stored per-user in Firestore)
  const [assignments, setAssignments] = useState([]);

  // Currency state (used across Dashboard/Store/etc.)
  const [coins, setCoins] = useState(3000000);

  // Firebase auth user + app loading gate (prevents saving before initial load finishes)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tracks the last time we applied overdue-penalty logic (to ensure it runs once per day)
  const [lastDecayCheck, setLastDecayCheck] = useState(null);

  // Current character customization (equipped items)
  const [character, setCharacter] = useState({
    base: "bread",
    jam: null,
    meat: null,
    mold: null,
    mystery: null,
    spread: null,
    veggie: null,
  });

  // Inventory of owned items by category (used to equip items + store ownership)
  const [inventory, setInventory] = useState({
    jam: [],
    meat: [],
    mold: [],
    mystery: [],
    spreads: [],
    veggies: [],
  });

  // Tracks which packs the user already owns (to prevent re-buying / show UI state)
  const [packsOwned, setPacksOwned] = useState([]);

  // Listen to auth state
  useEffect(() => {
    // Subscribes to Firebase auth changes (login/logout/account switch)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // Clear state when user changes (logout or login switch)
      // This prevents previous user's data from briefly flashing for a new user.
      if (!currentUser) {
        setAssignments([]);
        setCoins(3000000);
        setLastDecayCheck(null);
        setCharacter({
          base: "bread",
          jam: null,
          meat: null,
          mold: null,
          mystery: null,
          spread: null,
          veggie: null,
        });
        setInventory({
          jam: [],
          meat: [],
          mold: [],
          mystery: [],
          spreads: [],
          veggies: [],
        });
        setPacksOwned([]);
        setLoading(true);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Load user data when login
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      // Each user gets one document under: users/{uid}
      const docRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        // Hydrate state from Firestore (with safe fallbacks)
        const data = snapshot.data();
        setAssignments(data.assignments || []);
        setCoins(data.coins || 0);
        setLastDecayCheck(data.lastDecayCheck || null);
        setCharacter(
          data.character || {
            base: "bread",
            jam: null,
            meat: null,
            mold: null,
            mystery: null,
            spread: null,
            veggie: null,
          }
        );
        setInventory(
          data.inventory || {
            jam: [],
            meat: [],
            mold: [],
            mystery: [],
            spreads: [],
            veggies: [],
          }
        );
        setPacksOwned(data.packsOwned || []);
      } else {
        // First-time user: create default doc + initialize local state
        await setDoc(docRef, {
          assignments: [],
          coins: 3000000,
          lastDecayCheck: null,
          character: {
            base: "bread",
            jam: null,
            meat: null,
            mold: null,
            mystery: null,
            spread: null,
            veggie: null,
          },
          inventory: { jam: [], meat: [], mold: [], mystery: [], spreads: [], veggies: [] },
          packsOwned: [],
        });
        setAssignments([]);
        setCoins(3000000);
        setLastDecayCheck(null);
      }

      // After data is loaded, allow save effects to run
      setLoading(false);
    };

    loadData();
  }, [user]);

  // Save user data on change
  useEffect(() => {
    // Avoid saving while we’re still loading initial data
    if (!user || loading) return;

    const saveData = async () => {
      const docRef = doc(db, "users", user.uid);

      // Merge keeps any other doc fields intact while updating app-related state
      await setDoc(
        docRef,
        {
          assignments,
          coins,
          lastDecayCheck,
          character,
          inventory,
          packsOwned,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    };

    saveData();
  }, [assignments, coins, user, loading, lastDecayCheck, character, inventory, packsOwned]);

  // Daily overdue coin decay
  useEffect(() => {
    // Runs after login + after data loads
    if (!user || loading) return;

    const now = new Date();

    // Prevent applying decay more than once per calendar day
    if (lastDecayCheck && isSameDay(lastDecayCheck, now)) {
      return;
    }

    // Compute total penalty across all overdue + unsubmitted assignments
    let totalPenalty = 0;

    assignments.forEach((a) => {
      // Only penalize items that are late and not submitted
      if (!a.submitted && now > a.dueDate) {
        // Days late * 5 coins (86400000 ms = 1 day)
        totalPenalty += Math.floor((now - new Date(a.dueDate)) / 86400000) * 5;
      }
    });

    // Apply penalty once per day (never goes below 0)
    if (totalPenalty > 0) {
      setCoins((prevCoins) => Math.max(prevCoins - totalPenalty, 0));
    }

    // Record that we've processed decay for today
    setLastDecayCheck(now);
  }, [user, loading, assignments, lastDecayCheck]);

  // Adds a new assignment to state (Dashboard uses this via props)
  const handleAddAssignment = (assignment) => {
    setAssignments((prev) => [...prev, assignment]);
  };

  // Marks an assignment as submitted and awards coins based on submission timing
  const handleSubmitAssignment = (id) => {
    setAssignments((prev) =>
      prev.map((assignment) => {
        // Ignore non-matching assignments and prevent double-submitting
        if (assignment.id !== id || assignment.submitted) return assignment;

        const submittedAt = Date.now();

        // Determine reward amount (likely higher if on-time/early)
        const coinsEarned = calculateSubmissionCoins({
          dueDate: assignment.dueDate,
          submittedAt,
        });

        // Update coin balance immediately when submitted
        setCoins((prevCoins) => prevCoins + coinsEarned);

        return {
          ...assignment,
          submitted: true,
          submittedAt,
          coinsAwarded: coinsEarned,
        };
      })
    );
  };

  // Logs out current user (ToastLayout uses this via props)
  const handleLogout = async () => {
    await signOut(auth);
  };

  // Updates equipped character items (CharacterPage uses this via props)
  const handleUpdateCharacter = (newCharacter) => {
    setCharacter(newCharacter);
  };

  // Adds pack items into inventory and records the pack as owned
  const handleBuyPack = (packId, packItems) => {
    // Map pack ID to inventory category and add items
    const packCategoryMap = {
      jamPack: "jam",
      meatPack: "meat",
      moldPack: "mold",
      mysteryPack: "mystery",
      spreadPack: "spreads",
      veggiesPack: "veggies",
    };

    const category = packCategoryMap[packId];
    if (category) {
      // Use Set to avoid duplicates when adding new items
      setInventory((prev) => ({
        ...prev,
        [category]: [...new Set([...prev[category], ...packItems])],
      }));
    }

    // Track pack ownership (also de-duped)
    setPacksOwned((prev) => [...new Set([...prev, packId])]);
  };

  // If not authenticated, show login/signup UI
  if (!user) {
    return <AuthForm onLogin={setUser} />;
  }

  return (
    <Routes>
      {/* EVERYTHING is wrapped by ToastLayout now, INCLUDING HOME */}
      <Route element={<ToastLayout onLogout={handleLogout} />}>
        {/* HOME / DASHBOARD now gets the background + sidebar */}
        <Route
          path="/"
          element={
            <Dashboard
              coins={coins}
              assignments={assignments}
              onAddAssignment={handleAddAssignment}
              onSubmitAssignment={handleSubmitAssignment}
              character={character}
            />
          }
        />

        <Route
          path="/bread"
          element={
            <CharacterPage
              character={character}
              inventory={inventory}
              coins={coins}
              onUpdateCharacter={handleUpdateCharacter}
            />
          }
        />

        <Route path="/about" element={<About />} />

        <Route
          path="/store"
          element={
            <Store
              coins={coins}
              setCoins={setCoins}
              packsOwned={packsOwned}
              onBuyPack={handleBuyPack}
              inventory={inventory}
            />
          }
        />

      </Route>
    </Routes>
  );
}

export default App;
