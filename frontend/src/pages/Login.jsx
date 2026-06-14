import api from "../services/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "@/assets/login-image.jpeg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Navbar } from "@/components/layout/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { UtensilsCrossed, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  
  const navigate = useNavigate();
  const { toast } = useToast();
   
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setIsLoading(true);
  
      const response = await api.post("/auth/login", {
        identifier:email,
        password,
      });
  
      localStorage.setItem(
        "token",
        response.data.token
      );
  
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
      setUser(response.data.user);
      toast({
        title: "Welcome back!",
        description: "Login successful",
      });
  
      const role = response.data.user.role;
  
      if (role === "pending") {
        navigate("/role-selection");
      } else if (role === "provider") {
        navigate("/owner");
      } else if (role === "customer") {
        navigate("/dashboard");
      } else if (role === "admin") {
        navigate("/admin");
      }
  
    } catch (error) {
      console.log(error.response?.data);

  toast({
    title: "Login Failed",
    description:
      error.response?.data?.message ||
      "Invalid credentials",
    variant: "destructive",
  });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* NAVBAR */}
      <Navbar />

      {/* BODY */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* LEFT IMAGE SECTION */}
        <div className="hidden lg:flex relative">
          <img
            src={loginImage}
            alt="Tiffin Food"
            className="w-full h-full object-cover brightness-120"
          />

          {/* Overlay Text */}
          <div className="absolute inset-0 bg-black/50 flex items-end p-12">
            <div className="text-white">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 ml-[-20px]">
                Taste of Home,
                <br /> Delivered Daily
              </h1>
            </div>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="flex items-center justify-center px-4 py-8 mb-12 bg-muted/30">
          <Card className="w-full max-w-md shadow-xl rounded-3xl">

            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary rounded-xl p-3">
                  <UtensilsCrossed className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>

              <CardTitle className="text-2xl">
                Welcome Back
              </CardTitle>
              <CardDescription>
                Sign in to your TiffinHub account
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5">

                {/* EMAIL */}
                <div className="space-y-2  rounded-xl">
                  <Label>Email or Phone</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter email or phone"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="space-y-2 rounded-xl">
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                
                

              </CardContent>

              <CardFooter className="flex flex-col gap-4">

                <Button type="submit" className="w-full rounded-xl text-base py-6 transition-all hover:scale-[1.01]" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Login"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary font-medium hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>

              </CardFooter>
            </form>

          </Card>
        </div>

      </main>
    </div>
  );
}

export default Login;
