// React hook for managing local component state
import { useState } from "react";

// Component that visually renders the toast character
import BreadCharacter from "../components/BreadCharacter";

// Component that displays inventory items and allows equipping
import InventoryCupboard from "../components/InventoryCupboard";

// Coin icon image asset
import coinIcon from "../assets/coin.png";

// Styling for this page
import "./CharacterPage.css";

/**
 * formatNumber
 * Utility function to format numbers with commas
 * Example: 1000 -> "1,000"
 */
function formatNumber(n) {
  return n.toLocaleString("en-US");
}

/**
 * CharacterPage Component
 *
 * Props:
 * - character: The currently saved character configuration
 * - inventory: List of items owned by the player
 * - coins: Number of coins the player has
 * - onUpdateCharacter: Function to update character in parent state
 */
function CharacterPage({ character, inventory, coins, onUpdateCharacter }) {

  // Temporary character state (used for preview before saving)
  const [tempCharacter, setTempCharacter] = useState(character);

  // Tracks whether save confirmation message is visible
  const [saved, setSaved] = useState(false);

  /**
   * handleEquipItem
   * Updates the temporary character preview when a new item is equipped.
   */
  const handleEquipItem = (newCharacter) => {
    setTempCharacter(newCharacter);
  };

  /**
   * handleSave
   * Saves the customized character to parent state
   * and briefly shows a confirmation message.
   */
  const handleSave = () => {
    onUpdateCharacter(tempCharacter);
    setSaved(true);

    // Reset "Saved!" message after 2 seconds
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="characterPageContentOnly">

      {/* Page Header */}
      <div className="characterPageHeader">
        <h1 className="characterPageTitle">Customize Your Toast</h1>

        {/* Coin Display Section */}
        <div className="coinBox">
          <img className="coinIcon" src={coinIcon} alt="Coin icon" />
          <div className="coinText">{formatNumber(coins)}</div>
        </div>
      </div>

      {/* Main Customization Section */}
      <section className="characterPanel">

        {/* Character Preview Area */}
        <div className="characterPreviewSection">
          <div className="previewContainer">
            {/* Displays temporary character customization */}
            <BreadCharacter character={tempCharacter} size="small" />
          </div>

          {/* Save Button */}
          <div className="previewControls">
            <button className="saveButton" onClick={handleSave}>
              {/* Button text changes after saving */}
              {saved ? "✓ Saved!" : "Save Customization"}
            </button>
          </div>
        </div>

        {/* Inventory Panel (used to equip items) */}
        <InventoryCupboard
          inventory={inventory}
          character={tempCharacter}
          onEquipItem={handleEquipItem}
        />
      </section>
    </div>
  );
}

export default CharacterPage;
