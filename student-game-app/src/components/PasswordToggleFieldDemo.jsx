import React, { useState } from "react";
import "./PasswordToggleFieldDemo.css";

// Controlled password field component with scoped classes to avoid global CSS leaks
const PasswordToggleFieldDemo = ({ value, onChange, placeholder, required, name }) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="ptf-Root">
			<input
				type={showPassword ? "text" : "password"}
				className="ptf-Input"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				name={name}
			/>
			<button
				className="ptf-Toggle"
				type="button"
				onClick={() => setShowPassword(!showPassword)}
				aria-label={showPassword ? "Hide password" : "Show password"}
			>
				{showPassword ? "👁️" : "👁️‍🗨️"}
			</button>
		</div>
	);
};

export default PasswordToggleFieldDemo;
