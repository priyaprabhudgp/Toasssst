import React from "react";
import "./TextInputField.css";

/**
 * TextInputField Component
 * ------------------------
 * A reusable input field component used for text-based form inputs.
 * 
 * Props:
 * - type (string): The input type (e.g., "text", "password", "email").
 *                  Defaults to "text".
 * - value (string): The current value of the input field.
 * - onChange (function): Event handler triggered when the input value changes.
 * - placeholder (string): Placeholder text displayed inside the input.
 * - required (boolean): Determines whether the field is required.
 * - name (string): The name attribute used for form identification.
 * 
 * Styling:
 * - Wrapper div uses class "txt-Root"
 * - Input element uses class "txt-Input"
 */

const TextInputField = ({ type = "text", value, onChange, placeholder, required, name }) => (
  <div className="txt-Root">
    <input
      className="txt-Input"
      type={type}           // Defines the type of input field
      value={value}         // Controlled input value
      onChange={onChange}   // Handles user input changes
      placeholder={placeholder} // Displays hint text
      required={required}   // HTML required validation
      name={name}           // Input name for form handling
    />
  </div>
);

export default TextInputField;
