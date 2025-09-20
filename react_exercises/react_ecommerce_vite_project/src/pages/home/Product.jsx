import { useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";

export function Product({ product, loadCart, cart }) {
  const [quantity, setQuantity] = useState(1);

  const productCartQuantity = Number(
    (cart ?? []).find((i) => i.productId === product.id)?.quantity ?? 0
  );

  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity,
    });
    await loadCart();
    console.log(product.name, productCartQuantity);
  };

  const changeQuantity = (event) => {
    const selectedQuantity = Number(event.target.value);
    setQuantity(selectedQuantity);
  };

  const removeFromCart = async () => {
    await axios.put(`/api/cart-items/${product.id}`, {
      quantity: productCartQuantity - quantity,
    });
    await loadCart();
    console.log(product.name, productCartQuantity);
  };


  return (
    <div key={product.id} className="product-container">
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

      <div className="product-price">{formatMoney(product.priceCents)}</div>

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

      {productCartQuantity > 0 && <>Quantity in cart: {productCartQuantity}</>}

      <div className="product-spacer"></div>

      <div className="added-to-cart">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button className="add-to-cart-button button-primary" onClick={addToCart}>
        Add to Cart
      </button>
      <button
        className="add-to-cart-button button-regret"
        onClick={removeFromCart}
      >
        Delete from cart
      </button>
    </div>
  );
}
