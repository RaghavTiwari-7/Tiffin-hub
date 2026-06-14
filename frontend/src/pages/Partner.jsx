import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import {
  ChefHat,
  IndianRupee,
  Users,
  Clock,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    icon: IndianRupee,
    title: "Earn Extra Income",
    description: "Turn your cooking skills into a source of income from home",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Cook when you want, set your own availability and menu",
  },
  {
    icon: Users,
    title: "Reach More Customers",
    description: "Connect with food lovers in your neighborhood easily",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Build your brand and expand your customer base",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Get paid directly to your account with secure transactions",
  },
  {
    icon: CheckCircle,
    title: "Full Support",
    description: "We help you with marketing, delivery, and customer service",
  },
];

const steps = [
  {
    step: "01",
    title: "Sign Up as Partner",
    description: "Create your account and submit your profile for verification",
  },
  {
    step: "02",
    title: "Get Verified",
    description: "Our team verifies your kitchen and food quality standards",
  },
  {
    step: "03",
    title: "Create Your Menu",
    description: "Add your dishes, set prices, and upload photos",
  },
  {
    step: "04",
    title: "Start Earning",
    description: "Receive orders and start earning from your cooking",
  },
];

function Partner() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <ChefHat className="h-16 w-16 mx-auto mb-6 opacity-90" />

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Turn Your Kitchen Into a Business
            </h1>

            <p className="text-xl opacity-90 mb-8">
              Join hundreds of home cooks who are earning by sharing their love
              for cooking. No investment needed – just your passion for food.
            </p>

            <Link to="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-primary font-semibold"
              >
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed as a home cook
              entrepreneur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mb-4 group-hover:bg-primary/20">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to Get Started
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Becoming a TiffinHub partner is quick and easy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={index}>
                <div className="bg-background rounded-xl p-6 shadow-md h-full">
                  <div className="text-4xl font-bold text-primary/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Cooking?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our growing community of home cooks and start earning today.
              No registration fees, no hidden charges.
            </p>

            <Link to="/signup">
              <Button size="lg" className="gap-2">
                Become a Partner Now
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

export default Partner;
