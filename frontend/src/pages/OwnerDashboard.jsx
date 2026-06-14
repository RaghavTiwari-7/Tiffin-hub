import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { mockOrders, mockTiffinServices } from "@/data/mockData";

import {
  Plus,
  Package,
  IndianRupee,
  User,
  Utensils,
  Check,
  X,
  Edit,
  Trash2,
  Upload,
  TrendingUp,
} from "lucide-react";

function OwnerDashboard() {
  const { user } = useAuth();

  const [menuItems, setMenuItems] = useState([
    {
      id: "1",
      name: "Dal Chawal Thali",
      description: "Rice, dal, sabzi, roti, salad",
      price: 80,
      isVeg: true,
    },
    {
      id: "2",
      name: "Special Gujarati Thali",
      description: "Full thali with 8 items",
      price: 120,
      isVeg: true,
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    isVeg: true,
  });

  const ownerOrders = mockOrders.filter(
    (order) => order.tiffinId === "1"
  );

  const ownerTiffin = mockTiffinServices.find(
    (t) => t.id === "1"
  );

  const stats = {
    totalOrders: ownerOrders.length,
    pendingOrders: ownerOrders.filter(
      (o) => o.status === "pending"
    ).length,
    totalEarnings: ownerOrders.reduce(
      (sum, o) => sum + o.total,
      0
    ),
    thisWeek: 2450,
  };

  const addMenuItem = () => {
    if (newItem.name && newItem.price) {
      setMenuItems((prev) => [
        ...prev,
        {
          id: `new-${Date.now()}`,
          name: newItem.name,
          description: newItem.description,
          price: parseInt(newItem.price),
          isVeg: newItem.isVeg,
        },
      ]);

      setNewItem({
        name: "",
        description: "",
        price: "",
        isVeg: true,
      });
    }
  };

  const deleteMenuItem = (id) => {
    setMenuItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-500";
      case "preparing":
        return "bg-yellow-500";
      case "pending":
        return "bg-blue-500";
      case "accepted":
        return "bg-purple-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome, {user?.name || "Owner"}! 🍳
          </h1>
          <p className="text-muted-foreground">
            Manage your tiffin service and orders
          </p>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Orders */}
          <TabsContent value="orders" className="space-y-4">
            {ownerOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4 flex justify-between">
                  <span>Order #{order.id}</span>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Menu */}
          <TabsContent value="menu" className="space-y-6">
          <div className="flex gap-4">
  <Button asChild>
    <Link to="/create-tiffin">
      Create Tiffin
    </Link>
  </Button>

  <Button variant="outline" asChild>
    <Link to="/tiffins">
      View All Tiffins
    </Link>
  </Button>
</div>
            <Card>
              <CardHeader>
                <CardTitle>Add New Menu Item</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <Input
                  placeholder="Item Name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />

                <Input
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                />

                <Textarea
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />

                <Button onClick={addMenuItem}>Add Item</Button>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.name}</h3>
                      <span className="font-bold">₹{item.price}</span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMenuItem(item.id)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile">
            <Card>
              <CardContent className="p-4">
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}

export default OwnerDashboard;
