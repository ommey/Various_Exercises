import { Fragment, useState } from "react";
import "./Header.css";

export function Header({ cart }) {
  let totalQuantity = 0;
  const [clickedBasket, setClickedBasket] = useState(false);

  const showBasketMenu = () => {
    {
      clickedBasket ? setClickedBasket(false) : setClickedBasket(true);
    }
  };

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <>
      <div className="header">
        <div className="left-section">
          <a href="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </a>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <a className="orders-link header-link" href="/orders">
            <span className="orders-text">Orders</span>
          </a>

          <button className="cart-link header-link" onClick={showBasketMenu}>
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </button>
        </div>
      </div>
      {clickedBasket && (
        <div className="basket-menu" role="menu" aria-label="Cart menu">
          <ul>
            <li>
              <a href="/checkout" className="basket-item">
                Head to checkout!
              </a>
            </li>
            <li>
              <button className="basket-item danger">Reset basket</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
