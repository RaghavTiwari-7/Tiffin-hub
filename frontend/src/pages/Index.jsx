import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockTiffinServices } from "@/data/mockData";
import { CheckCircle } from "lucide-react";


import {
  Search,
  ChefHat,
  IndianRupee,
  BadgeCheck,
  Truck,
  Calendar,
  MapPin,
  Utensils,
  ShoppingBag,
  Heart,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: ChefHat,
    title: "Homemade Food",
    description: "Fresh, authentic home-cooked meals prepared with love and care",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description: "Quality meals at pocket-friendly prices starting from ₹70",
  },
  {
    icon: BadgeCheck,
    title: "Verified Cooks",
    description: "All our home cooks are verified for hygiene and quality",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick delivery to your doorstep within 30-45 minutes",
  },
  {
    icon: Calendar,
    title: "Subscription Plans",
    description: "Save more with weekly and monthly meal subscriptions",
  },
];

const steps = [
  {
    icon: MapPin,
    title: "Search Tiffins",
    description: "Enter your area or pincode to find nearby home cooks",
  },
  {
    icon: Utensils,
    title: "Choose Plan",
    description: "Browse menus and select your preferred meal plan",
  },
  {
    icon: ShoppingBag,
    title: "Place Order",
    description: "Add to cart and checkout with secure payment",
  },
  {
    icon: Heart,
    title: "Enjoy Homemade Food",
    description: "Receive fresh meals and savor the taste of home",
  },
];
const popularTiffins = mockTiffinServices;

function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/test-db")
      .then((res) => {
        console.log("Backend Connected");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/30 to-accent py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Homemade Meals,{" "}
              <span className="text-primary">Delivered Daily</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Find affordable and hygienic home-style food near you. Connect with
              verified home cooks in your neighborhood.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your area or pincode"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>

              <Link to="/dashboard">
                <Button size="lg" className="h-12 px-8 gap-2">
                  <Search className="h-5 w-5" />
                  Search
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Customers
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-primary">80+</div>
                <div className="text-sm text-muted-foreground">Home Cooks</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Areas Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose TiffinHub?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We bring the taste of home to your doorstep with our unique features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-primary/20">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>

                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Popular Tiffins */}
<section className="py-16 bg-background">
  <div className="container mx-auto px-4 max-w-7xl">

    <div className="flex items-center justify-between mb-6">
      <h2 className="text-3xl font-bold">
        Popular Tiffin Services Near You
      </h2>

      <Link to="/dashboard" className="text-primary font-medium">
        View All →
      </Link>
    </div>

    {/* Horizontal Scroll */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">


    {popularTiffins.slice(0, 4).map((tiffin) => (
        <Card
        key={tiffin.id}
        className="w-full max-w-[300px] hover:shadow-xl transition-all duration-300"
      >
      
          <img
            src={tiffin.image}
            alt={tiffin.name}
            className="h-40 w-full object-cover rounded-t-lg"
          />

          <CardContent className="p-4 space-y-2">

            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{tiffin.name}</h3>
              <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded">
                ⭐ {tiffin.rating}
              </span>
            </div>

            <p className="text-sm text-muted-foreground">
              {tiffin.cuisine}
            </p>

            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {tiffin.location}
            </p>

            <div className="flex justify-between items-center">
  <p className="font-medium text-primary">
    ₹{tiffin.pricePerMeal} per meal
  </p>

  {tiffin.isVerified && (
  <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
    <CheckCircle className="h-3 w-3" />
    Verified
  </span>
)}

</div>
            

          </CardContent>
        </Card>
      ))}

    </div>

  </div>
</section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get your favorite home-cooked meals in just 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                  {index + 1}
                </div>

                <div className="bg-background rounded-xl p-6 shadow-md">
                  <step.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%]">
                    <ArrowRight className="h-6 w-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Banner */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <ChefHat className="h-16 w-16 mx-auto mb-6 opacity-90" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Are You a Home Cook?
            </h2>

            <p className="text-xl opacity-90 mb-8">
              Join our network of home cooks and start earning by sharing your
              culinary skills. Reach customers in your area and grow your tiffin
              business.
            </p>

            <Link to="/partner">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-primary font-semibold"
              >
                Become a Partner
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Index;
