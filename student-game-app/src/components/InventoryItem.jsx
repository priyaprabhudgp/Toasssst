import "./InventoryItem.css";

function InventoryItem({ item, itemData, isEquipped, onEquip }) {
  return (
    <div className={`inventoryItem ${isEquipped ? "equipped" : ""}`}>
      <div className="itemImageWrapper">
        <img src={itemData.img} alt={itemData.name} className="itemImage" />
        {isEquipped && <div className="equippedBadge">✓</div>}
      </div>
      <div className="itemInfo">
        <p className="itemName">{itemData.name}</p>
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

export default InventoryItem;
