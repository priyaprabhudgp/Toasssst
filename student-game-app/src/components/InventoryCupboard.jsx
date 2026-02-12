// React hook for managing component state
import { useState } from "react";

// Component used to render individual inventory items
import InventoryItem from "./InventoryItem";

// Object containing metadata (name, image, etc.) for all possible items
import { ITEM_IMAGES } from "../data/packs";

// Styling for the cupboard layout
import "./InventoryCupboard.css";

/**
 * InventoryCupboard Component
 * 
 * Displays the player's inventory organized by category (tabs).
 * Allows equipping/unequipping items for the character.
 * 
 * Props:
 * - inventory: object containing arrays of item IDs by category
 * - character: object representing current character equipment state
 * - onEquipItem: function to update character equipment
 */
function InventoryCupboard({ inventory, character, onEquipItem }) {

  // Tracks which tab/category is currently active
  const [activeTab, setActiveTab] = useState("spreads");

  /**
   * Configuration object for all inventory tabs.
   * Each tab defines:
   * - label: display name
   * - items: array of item IDs from inventory
   * - equipKey: character property that stores equipped item
   */
  const tabConfig = {
    jam: {
      label: "Jam",
      items: inventory.jam || [],
      equipKey: "jam",
    },
    meat: {
      label: "Meat",
      items: inventory.meat || [],
      equipKey: "meat",
    },
    mold: {
      label: "Mold",
      items: inventory.mold || [],
      equipKey: "mold",
    },
    mystery: {
      label: "Mystery",
      items: inventory.mystery || [],
      equipKey: "mystery",
    },
    spreads: {
      label: "Spreads",
      items: inventory.spreads || [],
      equipKey: "spread",
    },
    veggies: {
      label: "Veggies",
      items: inventory.veggies || [],
      equipKey: "veggie",
    },
  };

  // Gets the currently selected tab configuration
  const currentTab = tabConfig[activeTab];

  // Retrieves the currently equipped item ID for this category
  const equippedItemId = character[currentTab.equipKey];

  /**
   * Handles equipping or unequipping an item.
   * If the clicked item is already equipped → unequip (set to null).
   * Otherwise → equip the selected item.
   * 
   * Updates the parent character state using onEquipItem callback.
   */
  const handleEquip = (itemId) => {
    onEquipItem({
      ...character,
      [currentTab.equipKey]: equippedItemId === itemId ? null : itemId,
    });
  };

  return (
    <div className="inventoryCupboard">
      <h2>Your Cupboard</h2>

      {/* Tab Navigation */}
      <div className="tabsContainer">
        {Object.entries(tabConfig).map(([key, tab]) => (
          <button
            key={key}
            className={`tab ${activeTab === key ? "active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {/* Displays category name and number of items */}
            {tab.label} ({tab.items.length})
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="itemsGrid">
        {currentTab.items.length === 0 ? (
          // Message shown if no items exist in this category
          <p className="emptyMessage">
            No items in this category yet. Buy a pack to get started!
          </p>
        ) : (
          // Render each item in the current category
          currentTab.items.map((itemId) => (
            <InventoryItem
              key={itemId}
              item={itemId}
              itemData={ITEM_IMAGES[itemId] || { name: "Unknown", img: "" }}
              isEquipped={equippedItemId === itemId}
              onEquip={handleEquip}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Exports component for use in other parts of the application
export default InventoryCupboard;
