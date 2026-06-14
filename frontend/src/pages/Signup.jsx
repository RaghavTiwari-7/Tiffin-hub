import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Navbar } from "@/components/layout/Navbar";


import { UtensilsCrossed, User, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function Signup() {
 
  
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setIsLoading(true);
  
      const response = await api.post("/auth/register", {
        full_name: name,
        email,
        phone,
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
        title: "Account created!",
        description: "Registration successful",
      });
  
      navigate("/role-selection");
  
    } catch (error) {
      toast({
        title: "Registration Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 bg-muted/30 overflow-y-auto">

      <Card className="w-full max-w-sm my-4">
          
          <CardHeader className="text-center space-y-2 pb-4">
            <div className="flex justify-center mb-2">
              <div className="bg-primary rounded-xl p-3">
                <UtensilsCrossed className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>

            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Join TiffinHub and discover homemade meals
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 px-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
  <Label htmlFor="phone">Phone Number</Label>
  <Input
    id="phone"
    type="text"
    placeholder="9876543210"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="pl-10"
    required
  />
</div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-4 px-6">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default Signup;
