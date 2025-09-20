import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(
    () => {
      axios.get("/api/products").then((response) => {
        setProducts(response.data);
      });
    },
    [
      /* empty array = runs once*/
    ]
  );

  return (
    <>
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <div className="home-page">
        <div className="home-page">
          <ProductsGrid products={products} />
        </div>
      </div>
    </>
  );
}
