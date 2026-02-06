import { useMemo, useState } from "react";
import "./Store.css";

import coinIcon from "../assets/coin.png";
import { STORE_ITEMS } from "../data/storeItems";

function formatNumber(n) {
  return n.toLocaleString("en-US");
}

function Store({ coins, setCoins }) {
  const [owned, setOwned] = useState(() => new Set());
  const items = useMemo(() => STORE_ITEMS, []);

  function handleBuy(item) {
    if (owned.has(item.id)) return;
    if (coins < item.price) return;

    setCoins((c) => c - item.price);
    setOwned((prev) => new Set(prev).add(item.id));
  }

  return (
    <div className="storeContentOnly">
      <div className="storeHeader">
        <h1 className="storeTitle">Store</h1>

        <div className="coinBox">
          <img className="coinIcon" src={coinIcon} alt="Coin icon" />
          <div className="coinText">{formatNumber(coins)}</div>
        </div>
      </div>

      <section className="storePanel">
        <div className="itemsScroll">
          <div className="itemsGrid">
            {items.map((item) => {
              const isOwned = owned.has(item.id);
              const canAfford = coins >= item.price;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={[
                    "itemCard",
                    isOwned ? "owned" : "",
                    !isOwned && !canAfford ? "locked" : "",
                  ].join(" ")}
                  onClick={() => handleBuy(item)}
                  title={
                    isOwned
                      ? "Owned"
                      : canAfford
                      ? `Buy for ${item.price}`
                      : "Not enough coins"
                  }
                >
                  <div className="itemImageWrap">
                    <img className="itemImage" src={item.img} alt={item.name} />
                  </div>

                  <div className="priceRow">
                    <img className="priceCoin" src={coinIcon} alt="Coin icon" />
                    <span className="priceText">{formatNumber(item.price)}</span>
                  </div>

                  {isOwned && <div className="badge">Owned</div>}
                  {!isOwned && !canAfford && (
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
