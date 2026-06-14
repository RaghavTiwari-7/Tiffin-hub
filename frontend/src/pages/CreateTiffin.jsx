import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function CreateTiffin() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mealType, setMealType] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await api.post(
        "/tiffins",
        {
          title,
          description,
          meal_type: mealType,
          price,
          image_url: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/owner");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to create tiffin"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Create Tiffin
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <Label>Title</Label>
              <Input
                placeholder="Veg Lunch Box"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                placeholder="2 Roti, Dal, Rice, Sabzi"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Meal Type</Label>
              <Input
                placeholder="veg / non-veg"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Image URL</Label>
              <Input
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Tiffin"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateTiffin;