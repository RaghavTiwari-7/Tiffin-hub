import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UtensilsCrossed, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin':
        return '/admin';
    
      case 'provider':
        return '/owner';
    
      case 'customer':
        return '/dashboard';
    
      default:
        return '/role-selection';
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={() => {scrollToTop();setMobileMenuOpen(false);}} className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-2">
              <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TiffinHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" onClick={() => {scrollToTop();setMobileMenuOpen(false);}} className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/partner" onClick={() => {scrollToTop();setMobileMenuOpen(false);}} className="text-muted-foreground hover:text-primary transition-colors">
              Become a Partner
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to={getDashboardLink()}>
  <Button
    variant="ghost"
    className="text-muted-foreground hover:text-primary hover:bg-transparent transition-colors"
  >
    Dashboard
  </Button>
</Link>

{user?.role === "customer" && (
  <Link to="/my-orders">
    <Button variant="ghost">
      My Orders
    </Button>
  </Link>
)}

{user?.role === "provider" && (
  <Link to="/create-tiffin">
    <Button variant="ghost">
      Create Tiffin
    </Button>
  </Link>
)}
                
                <span className="text-sm text-muted-foreground">Hi, {user?.full_name}</span>
                <Button
  variant="outline"
  onClick={logout}
  className="hover:bg-[#ffeedc] hover:text-black transition-colors"
>
  Logout
</Button>

              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
               <Button
  variant="ghost"
  className="hover:bg-[#ffeedc] hover:text-black transition-colors"
>
  Login
</Button>


                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/partner"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Become a Partner
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button variant="outline" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
