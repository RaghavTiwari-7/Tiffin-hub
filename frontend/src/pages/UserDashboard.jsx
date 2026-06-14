import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { mockTiffinServices, mockOrders } from "@/data/mockData";
import api from "../services/api";
import {
  Search,
  MapPin,
  Star,
  Heart,
  ShoppingCart,
  Clock,
  BadgeCheck,
  User,
  Package,
  Utensils,
} from "lucide-react";

export default function UserDashboard() {
  const { user, setUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(["1", "3"]);
  const [selectedTiffin, setSelectedTiffin] = useState(null);

  const userOrders = mockOrders.filter(
    (order) => order.userId === "1"
  );
  const [fullName, setFullName] = useState(
    user?.full_name || ""
  );
  
  const [email, setEmail] = useState(
    user?.email || ""
  );
  
  const [phone, setPhone] = useState(
    user?.phone || ""
  );
  
  const [address, setAddress] = useState(
    user?.address || ""
  );
  const handleSave = async () => {
    try {
      const token =
        localStorage.getItem("token");
  
      const res = await api.put(
        "/users/profile",
        {
          full_name: fullName,
          email,
          phone,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
      setUser(res.data.user);
  
      alert("Profile Updated");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };
  const filteredTiffins = mockTiffinServices.filter(
    (tiffin) =>
      tiffin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tiffin.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tiffin.cuisine.some((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
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
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome, {user?.full_name }! 👋
          </h1>
          <p className="text-muted-foreground">
            Find your favorite home-cooked meals today
          </p>
        </div>

        <Tabs defaultValue="browse">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="browse">
              <Utensils className="h-4 w-4 mr-1" />
              Browse
            </TabsTrigger>

            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-1" />
              My Orders
            </TabsTrigger>

            <TabsTrigger value="favorites">
              <Heart className="h-4 w-4 mr-1" />
              Favorites
            </TabsTrigger>

            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-1" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* ================= Browse ================= */}
          <TabsContent value="browse">
            <div className="relative max-w-md mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, location, or cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {selectedTiffin ? (
              <div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedTiffin(null)}
                  className="mb-4"
                >
                  ← Back
                </Button>

                <div className="grid md:grid-cols-2 gap-6">
                  <img
                    src={selectedTiffin.image}
                    alt={selectedTiffin.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />

                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      {selectedTiffin.name}
                      {selectedTiffin.isVerified && (
                        <BadgeCheck className="text-primary h-5 w-5" />
                      )}
                    </h2>

                    <p className="text-muted-foreground">
                      by {selectedTiffin.ownerName}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      {selectedTiffin.rating}
                      <MapPin className="h-4 w-4 ml-4" />
                      {selectedTiffin.location}
                    </div>

                    <p className="mt-4 text-muted-foreground">
                      {selectedTiffin.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedTiffin.cuisine.map((c) => (
                        <Badge key={c}>{c}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTiffins.map((tiffin) => (
                  <Card
                    key={tiffin.id}
                    className="cursor-pointer hover:shadow-lg"
                    onClick={() => setSelectedTiffin(tiffin)}
                  >
                    <div className="relative">
                      <img
                        src={tiffin.image}
                        alt={tiffin.name}
                        className="w-full h-40 object-cover"
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(tiffin.id);
                        }}
                      >
                        <Heart
                          className={
                            favorites.includes(tiffin.id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }
                        />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold">{tiffin.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {tiffin.cuisine.join(", ")}
                      </p>

                      <div className="flex justify-between mt-2">
                        <span className="text-primary font-bold">
                          ₹{tiffin.pricePerMeal}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {tiffin.rating}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ================= Orders ================= */}
          <TabsContent value="orders">
            {userOrders.map((order) => (
              <Card key={order.id} className="mb-4">
                <CardContent className="p-4 flex justify-between">
                  <div>
                    <p className="font-semibold">{order.tiffinName}</p>
                    <p className="text-sm text-muted-foreground">
                      Order #{order.id}
                    </p>
                  </div>

                  <div className="text-right">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <p className="font-bold mt-1">₹{order.total}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ================= Favorites ================= */}
          <TabsContent value="favorites">
  {favorites.length === 0 ? (
    <p className="text-muted-foreground">No favorites yet.</p>
  ) : (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockTiffinServices
        .filter((t) => favorites.includes(t.id))
        .map((tiffin) => (
          <Card
            key={tiffin.id}
            className="cursor-pointer hover:shadow-lg"
            onClick={() => setSelectedTiffin(tiffin)}
          >
            <div className="relative">
              <img
                src={tiffin.image}
                alt={tiffin.name}
                className="w-full h-40 object-cover"
              />

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(tiffin.id);
                }}
              >
                <Heart className="fill-red-500 text-red-500" />
              </Button>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold">{tiffin.name}</h3>

              <div className="flex justify-between mt-2">
                <span className="text-primary font-bold">
                  ₹{tiffin.pricePerMeal}
                </span>

                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {tiffin.rating}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )}
</TabsContent>


          {/* ================= Profile ================= */}
          <TabsContent value="profile">
  <Card className="max-w-lg">
    <CardContent className="p-6 space-y-4">

      <div>
        <label className="text-sm">Name</label>
        <Input
  value={fullName}
  onChange={(e) =>
    setFullName(e.target.value)
  }
  placeholder="Enter name"
/>
      </div>

      <div>
        <label className="text-sm">Email</label>
        <Input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
      </div>

      <div>
        <label className="text-sm">Phone</label>
        <Input
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>
      </div>

      <div>
        <label className="text-sm">Address</label>
        <Input
  value={address}
  onChange={(e) => setAddress(e.target.value)}
/>
      </div>

      <Button
  className="w-full mt-2"
  onClick={handleSave}
>
  Save Changes
</Button>

    </CardContent>
  </Card>
</TabsContent>

        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
