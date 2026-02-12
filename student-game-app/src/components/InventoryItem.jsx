// Import styling specific to this component
import "./InventoryItem.css";

/*
  InventoryItem Component

  Props:
  - item: The unique identifier for this inventory item (used when equipping).
  - itemData: Object containing item details (ex: { name, img }).
  - isEquipped: Boolean indicating whether this item is currently equipped.
  - onEquip: Function passed from parent component to handle equipping logic.
*/

function InventoryItem({ item, itemData, isEquipped, onEquip }) {
  return (
    // Root container
    // Adds "equipped" CSS class conditionally if the item is currently equipped
    <div className={`inventoryItem ${isEquipped ? "equipped" : ""}`}>
      
      {/* Wrapper for item image and equipped badge */}
      <div className="itemImageWrapper">
        
        {/* Item image */}
        <img 
          src={itemData.img} 
          alt={itemData.name} 
          className="itemImage" 
        />

        {/* Render a checkmark badge only if the item is equipped */}
        {isEquipped && <div className="equippedBadge">✓</div>}
      </div>

      {/* Item name and equip button section */}
      <div className="itemInfo">
        
        {/* Display item name */}
        <p className="itemName">{itemData.name}</p>

        {/* 
          Equip button:
          - Changes style if equipped
          - Calls onEquip with the item identifier when clicked
        */}
        <button
          className={`equipButton ${isEquipped ? "equipped" : ""}`}
          onClick={() => onEquip(item)}
        >
          {isEquipped ? "Equipped" : "Equip"}
        </button>
      </div>
    </div>
  );
}

// Export component for use in other parts of the application
export default InventoryItem;
