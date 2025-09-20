import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(
    () => {
      const getHomeData = async () => {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      };

      getHomeData();
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
