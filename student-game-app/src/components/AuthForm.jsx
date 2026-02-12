// Import React hook for managing component state
import { useState } from "react";

// Import Firebase authentication instance
import { auth } from "../firebase";

// Import Firebase authentication methods
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Import custom input components
import TextInputField from "./TextInputField";
import PasswordToggleFieldDemo from "./PasswordToggleFieldDemo";

// Import styling
import "./TextInputField.css";
import "./PasswordToggleFieldDemo.css";
import "./AuthForm.css";

/**
 * AuthForm Component
 * 
 * Handles user authentication (Login & Sign Up) using Firebase.
 * 
 * Props:
 * - onLogin: Function called after successful authentication.
 */
function AuthForm({ onLogin }) {

  // State for storing user email input
  const [email, setEmail] = useState("");

  // State for storing user password input
  const [password, setPassword] = useState("");

  // Boolean state to toggle between Login and Sign Up modes
  const [isLogin, setIsLogin] = useState(true);

  // State for displaying authentication errors
  const [error, setError] = useState("");

  /**
   * Handles form submission.
   * 
   * - Prevents page refresh
   * - Calls Firebase login or sign-up method
   * - Passes authenticated user back via onLogin
   * - Catches and displays errors
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let userCredential;

      // If in login mode, sign in existing user
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } 
      // Otherwise, create a new user account
      else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }

      // Send authenticated user object to parent component
      onLogin(userCredential.user);

    } catch (err) {
      // Display error message if authentication fails
      setError(err.message);
    }
  };

  return (
    <div className="AuthFormContainer">
      <div className="AuthCard">

        {/* Dynamic heading based on authentication mode */}
        <h2>{isLogin ? "Login in on Toassst 🍞" : "Sign Up on Toassst 🍞"}</h2>

        {/* Authentication Form */}
        <form onSubmit={handleSubmit}>

          {/* Email Input Field */}
          <TextInputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
          />

          {/* Password Input Field with visibility toggle */}
          <PasswordToggleFieldDemo
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            name="password"
          />

          {/* Submit Button (Login or Sign Up) */}
          <button className="button" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>

        </form>

        {/* Error Message Display */}
        {error && <p className="error">{error}</p>}

        {/* Toggle Between Login and Sign Up */}
        <button 
          className="toggleButton" 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create Account" : "Back to Login"}
        </button>

      </div>
    </div>
  );
}

// Export component for use in other parts of the app
export default AuthForm;
