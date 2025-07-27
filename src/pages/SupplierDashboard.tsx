import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Package, 
  TrendingUp, 
  Users, 
  Star, 
  Plus,
  Edit3,
  Trash2,
  Eye,
  ShoppingCart,
  Phone,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockProducts = [
  { 
    id: 1, 
    name: "Red Chili Powder", 
    price: 180, 
    unit: "kg", 
    stock: 500, 
    image: "🌶️",
    orders: 25,
    rating: 4.8,
    status: "active"
  },
  { 
    id: 2, 
    name: "Turmeric Powder", 
    price: 220, 
    unit: "kg", 
    stock: 300, 
    image: "🟡",
    orders: 18,
    rating: 4.6,
    status: "active"
  },
  { 
    id: 3, 
    name: "Garam Masala", 
    price: 350, 
    unit: "kg", 
    stock: 0, 
    image: "🥄",
    orders: 12,
    rating: 4.9,
    status: "out_of_stock"
  }
];

const mockOrders = [
  { 
    id: 1, 
    vendor: "Sharma Chat Corner", 
    items: ["Red Chili Powder x2", "Turmeric x1"], 
    total: 580, 
    status: "processing",
    date: "Today",
    location: "Chandni Chowk"
  },
  { 
    id: 2, 
    vendor: "Mumbai Street Food", 
    items: ["Garam Masala x3"], 
    total: 1050, 
    status: "shipped",
    date: "Yesterday",
    location: "Dadar"
  }
];

const SupplierDashboard = () => {
  const [products, setProducts] = useState(mockProducts);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: "kg",
    stock: "",
    description: "",
    image: "📦"
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseInt(newProduct.price),
      unit: newProduct.unit,
      stock: parseInt(newProduct.stock),
      image: newProduct.image,
      orders: 0,
      rating: 0,
      status: "active" as const
    };

    setProducts([...products, product]);
    setNewProduct({ name: "", price: "", unit: "kg", stock: "", description: "", image: "📦" });
    setIsAddingProduct(false);
    
    toast({
      title: "Product added successfully!",
      description: "Your product is now live for vendors to order.",
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been removed from your inventory.",
    });
  };

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    toast({
      title: "Order status updated",
      description: `Order #${orderId} is now ${newStatus}.`,
    });
  };

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
          <div className="flex items-center space-x-3">
            <Link to="/auth">
              <Button variant="default">Profile</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Supplier Dashboard</h1>
          <p className="text-muted-foreground">Manage your products and orders efficiently</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{products.length}</div>
              <div className="text-sm text-muted-foreground">Products Listed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <ShoppingCart className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{mockOrders.length}</div>
              <div className="text-sm text-muted-foreground">Active Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">₹12,500</div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm text-muted-foreground">Regular Customers</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Product Inventory</h3>
              <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="product-name">Product Name *</Label>
                      <Input
                        id="product-name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        placeholder="e.g., Red Chili Powder"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="product-price">Price *</Label>
                        <Input
                          id="product-price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                          placeholder="180"
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-unit">Unit</Label>
                        <Input
                          id="product-unit"
                          value={newProduct.unit}
                          onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                          placeholder="kg, L, pack"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="product-stock">Stock Quantity *</Label>
                      <Input
                        id="product-stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                        placeholder="500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-description">Description</Label>
                      <Textarea
                        id="product-description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        placeholder="Product description..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddProduct}>
                        Add Product
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-elevated transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-2xl">
                        {product.image}
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Price:</span>
                        <span className="font-medium">₹{product.price}/{product.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Stock:</span>
                        <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
                          {product.stock > 0 ? `${product.stock} ${product.unit}` : "Out of Stock"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Orders:</span>
                        <span className="font-medium">{product.orders}</span>
                      </div>
                      {product.rating > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Rating:</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Recent Orders</h3>
              <Link to="/orders">
                <Button variant="outline">View All Orders</Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">Order #{order.id}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {order.vendor} • {order.date}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {order.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold mb-2">₹{order.total}</div>
                        <Badge 
                          variant={
                            order.status === "shipped" ? "secondary" :
                            order.status === "processing" ? "default" : "outline"
                          }
                        >
                          {order.status === "shipped" ? "Shipped" : "Processing"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="font-medium mb-2">Items:</h5>
                      <ul className="text-sm text-muted-foreground">
                        {order.items.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "shipped")}
                        disabled={order.status === "shipped"}
                      >
                        Mark as Shipped
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Vendor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Business Analytics</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">₹12,500</div>
                    <p className="text-sm text-green-600">↗ 18% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Total Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 mb-2">87</div>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Product</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">🌶️</div>
                    <p className="text-sm text-muted-foreground">Red Chili Powder</p>
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

export default SupplierDashboard;