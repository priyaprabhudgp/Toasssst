import { useMemo } from "react";
import "./Store.css";

import coinIcon from "../assets/coin.png";
import { PACKS } from "../data/packs";

function formatNumber(n) {
  return n.toLocaleString("en-US");
}

function Store({ coins, setCoins, packsOwned, onBuyPack }) {
  const items = useMemo(() => PACKS, []);

  function handleBuy(pack) {
    if (packsOwned.includes(pack.id)) return;
    if (coins < pack.price) return;

    setCoins((c) => c - pack.price);
    onBuyPack(pack.id, pack.items);
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
            {items.map((pack) => {
              const isOwned = packsOwned.includes(pack.id);
              const canAfford = coins >= pack.price;

              return (
                <button
                  key={pack.id}
                  type="button"
                  className={[
                    "itemCard",
                    isOwned ? "owned" : "",
                    !isOwned && !canAfford ? "locked" : "",
                  ].join(" ")}
                  onClick={() => handleBuy(pack)}
                  title={
                    isOwned
                      ? "Owned"
                      : canAfford
                      ? `Buy for ${pack.price}`
                      : "Not enough coins"
                  }
                >
                  <div className="itemImageWrap">
                    <img className="itemImage" src={pack.img} alt={pack.name} />
                  </div>

                  <div className="priceRow">
                    <img className="priceCoin" src={coinIcon} alt="Coin icon" />
                    <span className="priceText">{formatNumber(pack.price)}</span>
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
