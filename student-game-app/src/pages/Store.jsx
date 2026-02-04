import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Store.css";

import toastLogo from "../assets/toast_tm.png";
import coinIcon from "../assets/coin.png";
import logoutIcon from "../assets/log_out.png";
import storeIcon from "../assets/Store.png";
import breadIcon from "../assets/bread.png";

import { STORE_ITEMS } from "../data/storeItems";

function formatNumber(n) {
  return n.toLocaleString("en-US");
}

function Store({ coins, setCoins }) {
  // Track owned items (by id)
  const [owned, setOwned] = useState(() => new Set());

  const items = useMemo(() => STORE_ITEMS, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  function handleBuy(item) {
    // already owned
    if (owned.has(item.id)) return;

    // not enough coins
    if (coins < item.price) return;

    // deduct coins + mark owned
    setCoins((c) => c - item.price);
    setOwned((prev) => new Set(prev).add(item.id));
  }

  return (
    <div className="storePage">
      {/* Sidebar */}
      <aside className="storeSidebar">
        <div className="brand">
          <img className="brandLogo" src={toastLogo} alt="toast logo" />
          <div className="brandText">toast™</div>
        </div>

        <nav className="sideNav">
          <Link className="sideLink" to="/">
            <span className="sideIcon" aria-hidden="true">🏠</span>
            <span>Home</span>
          </Link>

          <Link className="sideLink active" to="/store">
            <img className="sideImgIcon" src={storeIcon} alt="Store icon" />
            <span>Store</span>
          </Link>

          <Link className="sideLink" to="/character">
            <img className="sideImgIcon" src={breadIcon} alt="Bread icon" />
            <span>Bread</span>
          </Link>
        </nav>

        <div className="madeByCard">
          <div>Made by</div>
          <div>students</div>
          <div>for</div>
          <div>students</div>
          <div className="hearts">♡ ♡</div>
        </div>

        <button className="logoutBtn" type="button" onClick={handleLogout}>
          <img className="sideImgIcon" src={logoutIcon} alt="Logout icon" />
          <span>Logout</span>
          
        </button>
      </aside>

      {/* Main */}
      <main className="storeMain">
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
                    {!isOwned && !canAfford && <div className="badge danger">Too Expensive</div>}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Store;
