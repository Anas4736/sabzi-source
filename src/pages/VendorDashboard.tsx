import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Star, 
  Search, 
  Filter,
  Heart,
  MapPin,
  Phone,
  Clock,
  Truck
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const mockRecentOrders = [
  { id: 1, supplier: "Rajesh Spices", items: 3, total: 1150, status: "Delivered", date: "2 days ago" },
  { id: 2, supplier: "Fresh Veggie Mart", items: 5, total: 850, status: "In Transit", date: "1 day ago" },
  { id: 3, supplier: "Golden Oil Industries", items: 2, total: 1600, status: "Processing", date: "Today" }
];

const mockRecommendedProducts = [
  { id: 1, name: "Red Chili Powder", supplier: "Rajesh Spices", price: 180, unit: "kg", image: "🌶️", rating: 4.8 },
  { id: 2, name: "Cooking Oil", supplier: "Golden Oil", price: 120, unit: "L", image: "🛢️", rating: 4.6 },
  { id: 3, name: "Onions", supplier: "Fresh Veggie", price: 25, unit: "kg", image: "🧅", rating: 4.7 },
  { id: 4, name: "Basmati Rice", supplier: "Mumbai Rice Mills", price: 80, unit: "kg", image: "🌾", rating: 4.5 }
];

const mockCategories = [
  { name: "Spices", count: "120+", image: "🌶️", savings: "15%" },
  { name: "Vegetables", count: "200+", image: "🥬", savings: "20%" },
  { name: "Oil & Ghee", count: "90+", image: "🛢️", savings: "12%" },
  { name: "Rice & Grains", count: "85+", image: "🌾", savings: "18%" }
];

const VendorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
              <Button variant="default">Profile</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Vendor!</h1>
          <p className="text-muted-foreground">Manage your raw material sourcing with ease</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Active Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">₹8,500</div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-muted-foreground">Saved Items</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Products</TabsTrigger>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="suppliers">My Suppliers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Browse Products Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for products, suppliers..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Shop by Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockCategories.map((category, index) => (
                  <Link key={index} to="/suppliers">
                    <Card className="hover:shadow-warm transition-all duration-300 hover:scale-105 cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">{category.image}</div>
                        <h4 className="font-semibold mb-1">{category.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{category.count} suppliers</p>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Save {category.savings}
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recommended Products */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Recommended for You</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockRecommendedProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-elevated transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-2xl">
                          {product.image}
                        </div>
                        <Button variant="ghost" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <h4 className="font-semibold mb-1">{product.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">by {product.supplier}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-lg font-bold text-primary">
                          ₹{product.price}<span className="text-sm font-normal">/{product.unit}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {product.rating}
                        </div>
                      </div>
                      <Link to={`/product/${product.id}`}>
                        <Button className="w-full" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Recent Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Recent Orders</h3>
              <Link to="/orders">
                <Button variant="outline">View All Orders</Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {mockRecentOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Order #{order.id}</h4>
                        <p className="text-sm text-muted-foreground">
                          {order.supplier} • {order.items} items • {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">₹{order.total}</div>
                        <Badge 
                          variant={
                            order.status === "Delivered" ? "secondary" :
                            order.status === "In Transit" ? "default" : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">My Trusted Suppliers</h3>
              <Link to="/suppliers">
                <Button variant="outline">Find New Suppliers</Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Rajesh Spices & Co.", location: "Delhi", rating: 4.8, orders: 15 },
                { name: "Fresh Veggie Mart", location: "Chennai", rating: 4.7, orders: 8 },
                { name: "Golden Oil Industries", location: "Maharashtra", rating: 4.5, orders: 12 }
              ].map((supplier, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{supplier.name}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {supplier.location}
                        </div>
                      </div>
                      <Button variant="outline" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{supplier.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {supplier.orders} orders
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Spending Analytics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Spending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">₹8,500</div>
                    <p className="text-sm text-green-600">↗ 12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Money Saved</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-2">₹1,200</div>
                    <p className="text-sm text-muted-foreground">Through bulk orders</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">🌶️</div>
                    <p className="text-sm text-muted-foreground">Spices & Masalas</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;