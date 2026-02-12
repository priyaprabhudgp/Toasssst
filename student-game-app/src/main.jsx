// Import core React library (required to use JSX)
import React from "react";

// ReactDOM is used to render the React app into the actual HTML DOM
import ReactDOM from "react-dom/client";

// BrowserRouter enables client-side routing (navigation without page reloads)
import { BrowserRouter } from "react-router-dom";

// Main App component (root component of the application)
import App from "./App";

// Import Radix UI global theme styles
import "@radix-ui/themes/styles.css";

// Theme component from Radix UI to provide consistent styling across the app
import { Theme } from "@radix-ui/themes";

// Create the root React DOM node and render the application inside the HTML element with id="root"
ReactDOM.createRoot(document.getElementById("root")).render(
  
  // Theme wrapper provides global design system styles (colors, typography, spacing)
  <Theme>
    
    // BrowserRouter enables routing so different pages can be rendered based on URL
    <BrowserRouter>
      
      // App is the main component containing the rest of the application
      <App />
      
    </BrowserRouter>
    
  </Theme>
);
