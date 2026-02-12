import React, { useState } from "react";
import "./PasswordToggleFieldDemo.css";

/*
  PasswordToggleFieldDemo Component

  A reusable, controlled password input field with a visibility toggle button.
  - Uses local state to toggle between "password" and "text" input types.
  - Styled using scoped CSS class names (ptf-*) to prevent global CSS conflicts.
  - Designed to be controlled by a parent component via props.

  Props:
    value (string)        → Current input value (controlled component).
    onChange (function)   → Handler function for input changes.
    placeholder (string)  → Placeholder text for the input.
    required (boolean)    → Whether the field is required.
    name (string)         → Name attribute for form submission.
*/

// Controlled password field component with scoped classes to avoid global CSS leaks
const PasswordToggleFieldDemo = ({ value, onChange, placeholder, required, name }) => {
	// Local state to track whether password is visible or hidden
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="ptf-Root">
			{/* 
        Input field:
        - Type switches dynamically between "password" and "text"
        - Fully controlled via value + onChange from parent component
      */}
			<input
				type={showPassword ? "text" : "password"}
				className="ptf-Input"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				name={name}
			/>

			{/*
        Toggle button:
        - Changes visibility state when clicked
        - Uses aria-label for accessibility
        - Button type="button" prevents accidental form submission
      */}
			<button
				className="ptf-Toggle"
				type="button"
				onClick={() => setShowPassword(!showPassword)}
				aria-label={showPassword ? "Hide password" : "Show password"}
			>
				{/* Icon changes based on visibility state */}
				{showPassword ? "👁️" : "👁️‍🗨️"}
			</button>
		</div>
	);
};

export default PasswordToggleFieldDemo;
