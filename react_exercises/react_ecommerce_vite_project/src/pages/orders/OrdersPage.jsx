import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { formatMoney } from "../../utils/money";
import { Header } from "../../components/Header";
import dayjs from "dayjs";
import "./OrdersPage.css";
import { OrdersDetailGrid } from "./OrdersDetailGrid";
import { OrdersGrid } from "./OrdersGrid";

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
}
