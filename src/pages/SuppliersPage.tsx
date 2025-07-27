import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, MapPin, Phone, ShoppingCart, Filter } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - replace with Supabase queries
const mockSuppliers = [
  {
    id: 1,
    name: "Rajesh Spices & Co.",
    location: "Chandni Chowk, Delhi",
    rating: 4.8,
    reviews: 156,
    specialties: ["Spices", "Masalas", "Dry Fruits"],
    phone: "+91 98765 43210",
    verified: true,
    image: "🌶️",
    minOrder: "₹500",
    deliveryTime: "1-2 days"
  },
  {
    id: 2,
    name: "Mumbai Rice Mills",
    location: "Dadar, Mumbai",
    rating: 4.6,
    reviews: 89,
    specialties: ["Rice", "Grains", "Pulses"],
    phone: "+91 87654 32109",
    verified: true,
    image: "🌾",
    minOrder: "₹1000",
    deliveryTime: "2-3 days"
  },
  {
    id: 3,
    name: "Fresh Veggie Mart",
    location: "Koyambedu, Chennai",
    rating: 4.7,
    reviews: 234,
    specialties: ["Vegetables", "Fruits", "Herbs"],
    phone: "+91 76543 21098",
    verified: true,
    image: "🥬",
    minOrder: "₹300",
    deliveryTime: "Same day"
  },
  {
    id: 4,
    name: "Golden Oil Industries",
    location: "Sangli, Maharashtra",
    rating: 4.5,
    reviews: 67,
    specialties: ["Cooking Oil", "Ghee", "Butter"],
    phone: "+91 65432 10987",
    verified: true,
    image: "🛢️",
    minOrder: "₹800",
    deliveryTime: "2-4 days"
  },
  {
    id: 5,
    name: "Amul Dairy Products",
    location: "Anand, Gujarat",
    rating: 4.9,
    reviews: 445,
    specialties: ["Milk", "Cheese", "Paneer"],
    phone: "+91 54321 09876",
    verified: true,
    image: "🥛",
    minOrder: "₹400",
    deliveryTime: "1-2 days"
  },
  {
    id: 6,
    name: "Packaging Solutions Ltd",
    location: "Noida, UP",
    rating: 4.4,
    reviews: 123,
    specialties: ["Food Containers", "Wrapping", "Disposables"],
    phone: "+91 43210 98765",
    verified: true,
    image: "📦",
    minOrder: "₹600",
    deliveryTime: "3-5 days"
  }
];

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Spices", "Rice", "Vegetables", "Oil", "Dairy", "Packaging"];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesCategory = selectedCategory === "All" || 
                           supplier.specialties.some(specialty => 
                             specialty.toLowerCase().includes(selectedCategory.toLowerCase())
                           );
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🍛</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">StreetSource</h1>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/suppliers" className="text-primary font-medium">
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

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search suppliers, products, or locations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Verified Suppliers
            <span className="text-lg text-muted-foreground ml-2">
              ({filteredSuppliers.length} found)
            </span>
          </h2>
        </div>

        {/* Suppliers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-elevated transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-2xl">
                      {supplier.image}
                    </div>
                    <div>
                      <CardTitle className="text-lg leading-tight">{supplier.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {supplier.location}
                      </div>
                    </div>
                  </div>
                  {supplier.verified && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{supplier.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({supplier.reviews} reviews)
                    </span>
                  </div>
                  <a href={`tel:${supplier.phone}`} className="text-primary hover:text-primary/80">
                    <Phone className="h-4 w-4" />
                  </a>
                </div>

                {/* Specialties */}
                <div>
                  <div className="flex flex-wrap gap-1">
                    {supplier.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Min Order:</span>
                    <div className="font-medium">{supplier.minOrder}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Delivery:</span>
                    <div className="font-medium">{supplier.deliveryTime}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Link to={`/supplier/${supplier.id}`} className="flex-1">
                    <Button variant="default" className="w-full">
                      View Products
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No suppliers found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuppliersPage;