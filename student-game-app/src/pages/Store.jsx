// React hooks for memoization and local component state
import { useMemo, useState } from "react";
import "./Store.css";

// Assets and data imports
import coinIcon from "../assets/coin.png";
import { PACKS, ITEM_IMAGES } from "../data/packs";
import PackResultDialog from "../components/AlertDialog";

/**
 * Utility function to format numbers with commas (ex: 10000 → 10,000)
 */
function formatNumber(n) {
  return n.toLocaleString("en-US");
}

/**
 * Store Component
 * 
 * Props:
 * - coins: current coin balance
 * - setCoins: state setter to update coins
 * - packsOwned: packs the user owns (currently unused here)
 * - onBuyPack: function triggered after purchasing a pack
 * - inventory: player's current collected items by category
 */
function Store({ coins, setCoins, packsOwned, onBuyPack, inventory }) {

  // Memoized list of available packs (prevents unnecessary re-renders)
  const items = useMemo(() => PACKS, []);

  // Dialog state for displaying pulled item result
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pulledItem, setPulledItem] = useState(null);
  const [isDupe, setIsDupe] = useState(false);

  /**
   * Randomly selects items from a pack
   * @param {Array} packItems - list of item IDs in the pack
   * @param {number} dropCount - number of items to pull
   * @returns {Array} randomly selected item IDs
   */
  function getRandomItems(packItems, dropCount) {
    const result = [];
    for (let i = 0; i < dropCount; i++) {
      const randomIndex = Math.floor(Math.random() * packItems.length);
      result.push(packItems[randomIndex]);
    }
    return result;
  }

  /**
   * Handles purchasing a pack:
   * - Checks if user has enough coins
   * - Deducts coins
   * - Randomly pulls item(s)
   * - Checks for duplicates
   * - Opens result dialog
   * - Notifies parent component
   */
  function handleBuy(pack) {
    // Prevent purchase if insufficient coins
    if (coins < pack.price) return;

    // Deduct coins
    setCoins((c) => c - pack.price);

    // Generate random pulled items
    const randomItems = getRandomItems(pack.items, pack.dropCount || 1);
    
    // Get first pulled item details for dialog display
    const pulledItemId = randomItems[0];
    const itemData = ITEM_IMAGES[pulledItemId];
    
    // Map pack IDs to inventory categories
    const packCategoryMap = {
      jamPack: "jam",
      meatPack: "meat",
      moldPack: "mold",
      mysteryPack: "mystery",
      spreadPack: "spreads",
      veggiesPack: "veggies",
    };

    const category = packCategoryMap[pack.id];

    // Check if item is already owned
    const wasAlreadyOwned =
      inventory[category]?.includes(pulledItemId) || false;
    
    // Update dialog state
    setPulledItem(itemData);
    setIsDupe(wasAlreadyOwned);
    setDialogOpen(true);
    
    // Notify parent of purchase
    onBuyPack(pack.id, randomItems);
  }

  return (
    <div className="storeContentOnly">
      
      {/* Result dialog shown after opening a pack */}
      <PackResultDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        itemName={pulledItem?.name}
        itemImage={pulledItem?.img}
        isDupe={isDupe}
      />
      
      {/* Store header with title and coin balance */}
      <div className="storeHeader">
        <h1 className="storeTitle">Store</h1>

        <div className="coinBox">
          <img className="coinIcon" src={coinIcon} alt="Coin icon" />
          <div className="coinText">{formatNumber(coins)}</div>
        </div>
      </div>

      {/* Pack listing section */}
      <section className="storePanel">
        <div className="itemsScroll">
          <div className="itemsGrid">
            {items.map((pack) => {
              const canAfford = coins >= pack.price;

              return (
                <button
                  key={pack.id}
                  type="button"
                  className={[
                    "itemCard",
                    !canAfford ? "locked" : "",
                  ].join(" ")}
                  onClick={() => handleBuy(pack)}
                  title={
                    canAfford
                      ? `Buy for ${pack.price}`
                      : "Not enough coins"
                  }
                >
                  {/* Pack image */}
                  <div className="itemImageWrap">
                    <img
                      className="itemImage"
                      src={pack.img}
                      alt={pack.name}
                    />
                  </div>

                  {/* Price display */}
                  <div className="priceRow">
                    <img
                      className="priceCoin"
                      src={coinIcon}
                      alt="Coin icon"
                    />
                    <span className="priceText">
                      {formatNumber(pack.price)}
                    </span>
                  </div>

                  {/* Locked badge if user cannot afford */}
                  {!canAfford && (
                    <div className="badge danger">Too Expensive</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Store;
