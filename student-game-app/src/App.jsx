import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import AuthForm from "./components/Authform";
import AssignmentForm from "./components/AssignmentForm";
import AssignmentList from "./components/AssignmentList";

import { calculateSubmissionCoins } from "./logic/coinRules";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import About from "./pages/About";
import Store from "./pages/Store";

function App() {
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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
      } else {
        await setDoc(docRef, { assignments: [], coins: 0 });
        setAssignments([]);
        setCoins(0);
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
      await setDoc(docRef, { assignments, coins });
    };

    saveData();
  }, [assignments, coins, user, loading]);

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

  if (!user) {
    return <AuthForm onLogin={setUser} />;
  }

  return (
    <div>
      <p>Logged in as: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
      <p>🪙 Coins: {coins}</p>

      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/character">Character</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/store">Store</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <AssignmentForm onAddAssignment={handleAddAssignment} />
              <AssignmentList
                assignments={assignments}
                onSubmitAssignment={handleSubmitAssignment}
              />
            </>
          }
        />

        <Route path="/character" element={<h2>Character Page (Coming Soon)</h2>} />

        <Route path="/about" element={<About />} />

        <Route path="/store" element={<Store coins={coins} setCoins={setCoins} />} />
      </Routes>
    </div>
  );
}

export default App;
