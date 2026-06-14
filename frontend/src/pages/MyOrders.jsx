import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Orders Response:", res.data);
      setOrders(res.data.orders);
    } catch (error) {
        console.log("Error:", error);
        console.log("Response:", error.response?.data);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-muted/30">
      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">
                {order.title}
              </h2>

              <p>
                Quantity: {order.quantity}
              </p>

              <p>
                Amount: ₹{order.total_amount}
              </p>

              <p>
                Address: {order.delivery_address}
              </p>

              <p>
                Status: {order.status}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;