import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";


import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Partner from "./pages/Partner";
import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import RoleSelection from "./pages/RoleSelection";
import CreateProvider from "./pages/CreateProvider";
import CreateTiffin from "./pages/CreateTiffin";
import ViewAllTiffins from "./pages/ViewAllTiffins";
import MyOrders from "./pages/MyOrders";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
          <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/role-selection"element={<ProtectedRoute><RoleSelection /></ProtectedRoute>}/>
              <Route path="/create-provider"element={<ProtectedRoute><CreateProvider /></ProtectedRoute>}/>
              <Route path="/create-tiffin"element={<ProtectedRoute><CreateTiffin /></ProtectedRoute>}/>
              <Route path="/tiffins"element={<ViewAllTiffins />}/>
              <Route path="/my-orders"element={<ProtectedRoute><MyOrders/></ProtectedRoute>}/>
              <Route path="/partner" element={<Partner />} />
              <Route path="/owner"element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>}/>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/owner" element={<OwnerDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
    
  );
}

export default App;
