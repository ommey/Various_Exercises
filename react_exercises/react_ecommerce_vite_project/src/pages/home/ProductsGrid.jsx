import { Product } from "./Product";

export function ProductsGrid({ products, loadCart, cart}) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product key={product.id} product={product} loadCart={loadCart} cart={cart} />
        );
      })}
    </div>
  );
}
