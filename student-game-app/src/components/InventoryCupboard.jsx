import { useState } from "react";
import InventoryItem from "./InventoryItem";
import { ITEM_IMAGES } from "../data/packs";
import "./InventoryCupboard.css";

function InventoryCupboard({ inventory, character, onEquipItem }) {
  const [activeTab, setActiveTab] = useState("spreads");

  const tabConfig = {
    spreads: {
      label: "Items",
      items: inventory.spreads || [],
      equipKey: "spread",
    },
    /*
    meat: {
      label: "Toppings",
      items: inventory.toppings || [],
      equipKey: "topping",
    },
    accessories: {
      label: "Accessories",
      items: inventory.accessories || [],
      equipKey: "accessory",
    },*/


  };

  const currentTab = tabConfig[activeTab];
  const equippedItemId = character[currentTab.equipKey];

  const handleEquip = (itemId) => {
    onEquipItem({
      ...character,
      [currentTab.equipKey]: equippedItemId === itemId ? null : itemId,
    });
  };

  return (
    <div className="inventoryCupboard">
      <h2>Your Cupboard</h2>

      <div className="tabsContainer">
        {Object.entries(tabConfig).map(([key, tab]) => (
          <button
            key={key}
            className={`tab ${activeTab === key ? "active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {tab.label} ({tab.items.length})
          </button>
        ))}
      </div>

      <div className="itemsGrid">
        {currentTab.items.length === 0 ? (
          <p className="emptyMessage">No items in this category yet. Buy a pack to get started!</p>
        ) : (
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

export default InventoryCupboard;
