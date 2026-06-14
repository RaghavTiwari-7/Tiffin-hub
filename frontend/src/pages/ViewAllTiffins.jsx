import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

function ViewAllTiffins() {
  const [tiffins, setTiffins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTiffins();
  }, []);

  
  const fetchTiffins = async () => {
    try {
      const res = await api.get("/tiffins");

      setTiffins(res.data.tiffins);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }
  const handleOrder = async (tiffinId) => {
    try {
      const token = localStorage.getItem("token");
  
      const address = prompt(
        "Enter Delivery Address"
      );
  
      if (!address) return;
  
      await api.post(
        "/orders",
        {
          tiffin_id: tiffinId,
          quantity: 1,
          delivery_address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert("Order placed successfully!");
    } catch (error) {
      console.log(error);
  
      alert(
        error.response?.data?.message ||
          "Failed to place order"
      );
    }
  };
  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <h1 className="text-3xl font-bold mb-8">
        Available Tiffins
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {tiffins.map((tiffin) => (
          <Card key={tiffin.id}>
            <CardContent className="p-4">

              {tiffin.image_url && (
                <img
                  src={tiffin.image_url}
                  alt={tiffin.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <h2 className="text-xl font-semibold">
                {tiffin.title}
              </h2>

              <p className="text-muted-foreground mt-2">
                {tiffin.description}
              </p>

              <p className="mt-3">
                <strong>Meal Type:</strong>{" "}
                {tiffin.meal_type}
              </p>

              <p className="mt-2">
                <strong>Provider:</strong>{" "}
                {tiffin.business_name}
              </p>

              <p className="text-2xl font-bold text-primary mt-4">
                ₹{tiffin.price}
              </p>

              <Button
              className="w-full mt-4"onClick={() => handleOrder(tiffin.id)}>
                Order Now
              </Button>

            </CardContent>
          </Card>
        ))}

      </div>
    </div>
  );
}

export default ViewAllTiffins;