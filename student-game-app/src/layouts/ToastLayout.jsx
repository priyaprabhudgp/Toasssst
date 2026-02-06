import { Link, Outlet, useLocation } from "react-router-dom";
import "./ToastLayout.css";

import toastLogo from "../assets/toast_tm.png";
import storeIcon from "../assets/Store.png";
import breadIcon from "../assets/bread.png";
import logoutIcon from "../assets/log_out.png";

function ToastLayout({ onLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="toastShell">
      <aside className="toastSidebar">
        <div className="toastBrand">
          <img src={toastLogo} alt="Toast logo" className="toastBrandLogo" />
          <div className="toastBrandText">toast™</div>
        </div>

        <nav className="toastNav">
          <Link className={`toastNavItem ${isActive("/") ? "active" : ""}`} to="/">
            <span className="toastEmoji" aria-hidden="true">🏠</span>
            <span className="toastNavText">Home</span>
          </Link>

          <Link
            className={`toastNavItem ${isActive("/store") ? "active" : ""}`}
            to="/store"
          >
            <img src={storeIcon} alt="Store" className="toastNavIcon" />
            <span className="toastNavText">Store</span>
          </Link>

          <Link
            className={`toastNavItem ${isActive("/bread") ? "active" : ""}`}
            to="/bread"
          >
            <img src={breadIcon} alt="Bread" className="toastNavIcon" />
            <span className="toastNavText">Bread</span>
          </Link>
        </nav>

        <div className="toastMadeBy">
          <div>Made by</div>
          <div>students</div>
          <div>♡ for ♡</div>
          <div>students</div>
        </div>

        <button className="toastLogout" type="button" onClick={onLogout}>
          <img src={logoutIcon} alt="Logout" className="toastNavIcon" />
          <span className="toastNavText">Logout</span>
        </button>
      </aside>

      <main className="toastMain">
        <div className="toastCanvas">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ToastLayout;
