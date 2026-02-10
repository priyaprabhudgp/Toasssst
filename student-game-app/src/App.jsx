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
  const [assignments, setAssignments] = useState([]);
  const [coins, setCoins] = useState(3000000);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastDecayCheck, setLastDecayCheck] = useState(null);
  const [character, setCharacter] = useState({
    base: "bread",
    spread: null,
    topping: null,
    accessory: null,
  });
  const [inventory, setInventory] = useState({
    spreads: [],
    toppings: [],
    accessories: [],
  });
  const [packsOwned, setPacksOwned] = useState([]);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // Clear state when user changes (logout or login switch)
      if (!currentUser) {
        setAssignments([]);
        setCoins(3000000);
        setLastDecayCheck(null);
        setCharacter({
          base: "bread",
          spread: null,
          topping: null,
          accessory: null,
        });
        setInventory({
          spreads: [],
          toppings: [],
          accessories: [],
        });
        setPacksOwned([]);
        setLoading(true);
      }
    });

    return () => unsubscribe();
  }, []);

  // Load user data when login
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      const docRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        setAssignments(data.assignments || []);
        setCoins(data.coins || 0);
        setLastDecayCheck(data.lastDecayCheck || null);
        setCharacter(data.character || {
          base: "bread",
          spread: null,
          topping: null,
          accessory: null,
        });
        setInventory(data.inventory || {
          spreads: [],
          toppings: [],
          accessories: [],
        });
        setPacksOwned(data.packsOwned || []);
      } else {
        await setDoc(docRef, {
          assignments: [],
          coins: 3000000,
          lastDecayCheck: null,
          character: { base: "bread", spread: null, topping: null, accessory: null },
          inventory: { spreads: [], toppings: [], accessories: [] },
          packsOwned: [],
        });
        setAssignments([]);
        setCoins(3000000);
        setLastDecayCheck(null);
      }

      setLoading(false);
    };

    loadData();
  }, [user]);

  // Save user data on change
  useEffect(() => {
    if (!user || loading) return;

    const saveData = async () => {
      const docRef = doc(db, "users", user.uid);
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
    if (!user || loading) return;

    const now = new Date();
    if (lastDecayCheck && isSameDay(lastDecayCheck, now)) {
      return;
    }

    let totalPenalty = 0;

    assignments.forEach((a) => {
      if (!a.submitted && now > a.dueDate) {
        totalPenalty +=
          Math.floor((now - new Date(a.dueDate)) / 86400000) * 5;
      }
    });

    if (totalPenalty > 0) {
      setCoins((prevCoins) => Math.max(prevCoins - totalPenalty, 0));
    }

    setLastDecayCheck(now);
  }, [user, loading, assignments, lastDecayCheck]);

  const handleAddAssignment = (assignment) => {
    setAssignments((prev) => [...prev, assignment]);
  };

  const handleSubmitAssignment = (id) => {
    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id !== id || assignment.submitted) return assignment;

        const submittedAt = Date.now();
        const coinsEarned = calculateSubmissionCoins({
          dueDate: assignment.dueDate,
          submittedAt,
        });

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

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleUpdateCharacter = (newCharacter) => {
    setCharacter(newCharacter);
  };

  const handleBuyPack = (packId, packItems) => {
    // Add items to inventory
    setInventory((prev) => ({
      ...prev,
      spreads: [...new Set([...prev.spreads, ...packItems])],
    }));

    // Track pack ownership
    setPacksOwned((prev) => [...new Set([...prev, packId])]);
  };

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
            />
          }
        />

      </Route>
    </Routes>
  );
}

export default App;
