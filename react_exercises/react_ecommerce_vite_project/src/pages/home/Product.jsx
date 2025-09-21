import { Fragment, useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";

export function Product({ product, loadCart, cart }) {
  const [justAdded, setJustAdded] = useState(false);
  const [justDeleted, setJustDeleted] = useState(false);
  const [quantity, setQuantity] = useState(1);




  const showDeleteBanner = (next) => {
    if (justAdded) {
      setJustDeleted(false);
    }
    setJustDeleted(true);
    setTimeout(() => setJustDeleted(false), 1200);
  };

  const showAddBanner = (next) => {
    if (justDeleted) {
      setJustDeleted(false);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const productCartQuantity = Number(
    (cart ?? []).find((i) => i.productId === product.id)?.quantity ?? 0
  );

  const inCartInfoText =
    productCartQuantity > 0 ? `${productCartQuantity} in cart` : "";

  /*`${productCartQuantity} in cart`;*/

  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity,
    });
    await loadCart();
    showAddBanner();
    console.log(product.name, productCartQuantity);
  };

  const changeQuantity = (event) => {
    const selectedQuantity = Number(event.target.value);
    setQuantity(selectedQuantity);
  };

  const deleteFromCart = async () => {
    await axios.delete(`/api/cart-items/${product.id}`);
    showDeleteBanner();
    await loadCart();
  };

  const removeFromCart = async () => {
    const next = productCartQuantity - quantity;
    if (next > 0) {
      await axios.put(`/api/cart-items/${product.id}`, { quantity: next });
    } else {
      await deleteFromCart(); // await it so ordering is consistent
      return;
    }
    showDeleteBanner(next);
    await loadCart();
  };

  return (
    <div
      key={product.id}
      className={`product-container ${productCartQuantity > 0 ? "show" : ""}`}
    >
      <div
        className={`in-basket-flag ${productCartQuantity > 0 ? "show" : ""}`}
      >
        <img
          className="in-basket-flag-image"
          src="public/images/icons/quantity_flag.png"
          alt=""
        />
          <p className="in-basket-flag-text">{productCartQuantity}</p>
      </div>
      <div className={`removed-from-cart-banner ${justDeleted ? "show" : ""}`}>
        <img
          className="removed-from-cart-image"
          src="public/images/icons/deleted.png"
          alt=""
        />
      </div>

      <div className={`added-to-cart-banner ${justAdded ? "show" : ""}`}>
        <img
          className="added-to-cart-image"
          src="public/images/icons/add.png"
          alt=""
        />
      </div>
      <div className="product-image-container">
        <img className="product-image" src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price-quantity">
        <div className="price-section">{formatMoney(product.priceCents)}</div>
        <div
          className={`product-in-cart-quantity ${
            productCartQuantity > 0 ? "show" : ""
          }`}
        >
          {productCartQuantity > 0 ? `${productCartQuantity} in cart` : ""}
        </div>{" "}
        <div className="product-quantity-container">
          <select value={quantity} onChange={changeQuantity}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="product-spacer"></div>
      </div>
      <div className="add-to-cart-buttons-row">
        <button
          className="add-to-cart-button button-primary"
          onClick={addToCart}
        >
          Add {quantity} to Cart
        </button>
      </div>
      <div className="remove-from-cart-buttons-row">
        <button
          className="remove-from-cart-button
          button-regret"
          onClick={deleteFromCart}
        >
          Delete
        </button>
        <button
          className="remove-from-cart-button
          button-regret"
          onClick={removeFromCart}
        >
          Reduce {quantity}
        </button>
      </div>
    </div>
  );
}
