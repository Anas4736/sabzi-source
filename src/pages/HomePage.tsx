import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Users, TrendingUp, Star, MapPin, Phone, MessageCircle, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const features = [
    {
      icon: Users,
      title: "Verified Suppliers",
      description: "Connect with trusted suppliers across India",
      color: "bg-gradient-primary"
    },
    {
      icon: TrendingUp,
      title: "Best Prices",
      description: "Compare prices and get the best deals",
      color: "bg-gradient-warm"
    },
    {
      icon: ShoppingCart,
      title: "Easy Ordering",
      description: "Simple ordering system designed for vendors",
      color: "bg-gradient-fresh"
    }
  ];

  const categories = [
    { name: "Spices & Masalas", count: "120+ suppliers", image: "🌶️" },
    { name: "Rice & Grains", count: "85+ suppliers", image: "🌾" },
    { name: "Oil & Ghee", count: "90+ suppliers", image: "🛢️" },
    { name: "Vegetables", count: "200+ suppliers", image: "🥬" },
    { name: "Dairy Products", count: "45+ suppliers", image: "🥛" },
    { name: "Packaging", count: "60+ suppliers", image: "📦" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🍛</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">StreetSource</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/suppliers" className="text-foreground hover:text-primary transition-colors">
              Suppliers
            </Link>
            <Link to="/compare" className="text-foreground hover:text-primary transition-colors">
              Compare
            </Link>
            <Link to="/orders" className="text-foreground hover:text-primary transition-colors">
              Orders
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link to="/cart">
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="default">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              🎯 For Indian Street Food Vendors
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Source Quality Raw Materials
              <span className="block text-primary">With Trust & Ease</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with verified suppliers, compare prices, and get the best deals for your street food business. Simple, trusted, affordable.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/suppliers">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Browse Suppliers
              </Button>
            </Link>
            <Link to="/vendor-dashboard">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Vendor Dashboard
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-elevated transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full ${feature.color} mx-auto flex items-center justify-center mb-4`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Shop by Category
            </h3>
            <p className="text-lg text-muted-foreground">
              Find suppliers for all your street food needs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link key={index} to="/suppliers">
                <Card className="text-center hover:shadow-warm transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{category.image}</div>
                    <h4 className="font-semibold text-sm mb-1">{category.name}</h4>
                    <p className="text-xs text-muted-foreground">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-primary text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Verified Suppliers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2000+</div>
              <div className="text-primary-foreground/80">Happy Vendors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">₹50L+</div>
              <div className="text-primary-foreground/80">Monthly Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.8⭐</div>
              <div className="text-primary-foreground/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🍛</span>
                </div>
                <h4 className="text-xl font-bold">StreetSource</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Empowering Indian street food vendors with trusted raw material sourcing.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <div className="space-y-2 text-sm">
                <Link to="/suppliers" className="block text-gray-300 hover:text-white transition-colors">
                  Browse Suppliers
                </Link>
                <Link to="/compare" className="block text-gray-300 hover:text-white transition-colors">
                  Compare Prices
                </Link>
                <Link to="/vendor-dashboard" className="block text-gray-300 hover:text-white transition-colors">
                  Vendor Dashboard
                </Link>
                <Link to="/supplier-dashboard" className="block text-gray-300 hover:text-white transition-colors">
                  Supplier Dashboard
                </Link>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <div className="space-y-2 text-sm">
                <Link to="/chat-support" className="block text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Chat Support
                </Link>
                <a href="https://wa.me/1234567890" className="block text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  WhatsApp Support
                </a>
                <Link to="/help" className="block text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Help Center
                </Link>
                <Link to="/faq" className="block text-gray-300 hover:text-white transition-colors">
                  FAQs
                </Link>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Mumbai, Maharashtra
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +91 98765 43210
                </div>
                <Link to="/contact" className="block hover:text-white transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 StreetSource. Empowering street food vendors across India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;