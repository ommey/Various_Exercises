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
    const fetchOrdersData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };

    fetchOrdersData();
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
