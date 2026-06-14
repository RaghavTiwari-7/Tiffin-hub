import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { User, ChefHat } from "lucide-react";

function RoleSelection() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = async (role) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.patch(
        "/users/select-role",
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
      localStorage.setItem(
        "role",
        updatedUser.role
      );

      if (role === "provider") {
        navigate("/create-provider");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to update role"
      );
    } finally {
      setLoading(false);
    }
  };

  const user = JSON.parse(
    localStorage.getItem("user")
  );
  

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">
            Welcome {user?.full_name}
          </h1>

          <p className="text-muted-foreground text-lg">
            How would you like to use Tiffin Hub?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* CUSTOMER CARD */}
          <Card
            className="cursor-pointer hover:shadow-xl transition-all border-2 hover:border-primary"
            onClick={() => handleRoleSelect("customer")}
          >
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <User className="h-12 w-12 text-primary" />
              </div>

              <h2 className="text-2xl font-bold mb-2">
                Customer
              </h2>

              <p className="text-muted-foreground mb-6">
                Order delicious homemade food from nearby tiffin providers.
              </p>

              <Button className="w-full" disabled={loading}>
                Order Food
              </Button>
            </CardContent>
          </Card>

          {/* PROVIDER CARD */}
          <Card
            className="cursor-pointer hover:shadow-xl transition-all border-2 hover:border-primary"
            onClick={() => handleRoleSelect("provider")}
          >
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <ChefHat className="h-12 w-12 text-primary" />
              </div>

              <h2 className="text-2xl font-bold mb-2">
                Provider
              </h2>

              <p className="text-muted-foreground mb-6">
                Sell your homemade meals and grow your food business.
              </p>

              <Button className="w-full" disabled={loading}>
                Sell Food
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

export default RoleSelection;