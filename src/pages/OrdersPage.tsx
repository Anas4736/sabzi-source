import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Search, 
  Filter, 
  Eye, 
  Phone, 
  MessageCircle,
  Truck,
  CheckCircle,
  Clock,
  ArrowLeft,
  MapPin,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock orders data
const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    supplier: "Rajesh Spices & Co.",
    supplierPhone: "+91 98765 43210",
    items: [
      { name: "Red Chili Powder", quantity: 2, price: 360, unit: "kg" },
      { name: "Turmeric Powder", quantity: 1, price: 220, unit: "kg" }
    ],
    total: 580,
    status: "delivered",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-17",
    deliveryAddress: "Shop 15, Main Market, Delhi",
    trackingId: "TRK123456789"
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    supplier: "Fresh Veggie Mart",
    supplierPhone: "+91 87654 32109",
    items: [
      { name: "Onions", quantity: 10, price: 250, unit: "kg" },
      { name: "Tomatoes", quantity: 5, price: 150, unit: "kg" },
      { name: "Green Chilies", quantity: 2, price: 80, unit: "kg" }
    ],
    total: 480,
    status: "in_transit",
    orderDate: "2024-01-18",
    deliveryDate: "2024-01-20",
    deliveryAddress: "Shop 15, Main Market, Delhi",
    trackingId: "TRK123456790"
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    supplier: "Golden Oil Industries",
    supplierPhone: "+91 76543 21098",
    items: [
      { name: "Sunflower Oil", quantity: 5, price: 600, unit: "L" },
      { name: "Mustard Oil", quantity: 2, price: 300, unit: "L" }
    ],
    total: 900,
    status: "processing",
    orderDate: "2024-01-20",
    deliveryDate: "2024-01-23",
    deliveryAddress: "Shop 15, Main Market, Delhi",
    trackingId: "TRK123456791"
  }
];

const OrdersPage = () => {
  const [orders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800 border-green-200";
      case "in_transit": return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      case "in_transit": return <Truck className="h-4 w-4" />;
      case "processing": return <Clock className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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
            <Link to="/suppliers" className="text-foreground hover:text-primary transition-colors">
              Suppliers
            </Link>
            <Link to="/compare" className="text-foreground hover:text-primary transition-colors">
              Compare
            </Link>
            <Link to="/orders" className="text-primary font-medium">
              Orders
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link to="/auth">
              <Button variant="default">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/vendor-dashboard" className="flex items-center text-primary hover:text-primary/80 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Package className="h-8 w-8" />
            Order History
          </h1>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search orders, suppliers, or products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["all", "processing", "in_transit", "delivered"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === "all" ? "All" : status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
              </Button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">No orders found</h2>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filters" 
                  : "You haven't placed any orders yet"}
              </p>
              <Link to="/suppliers">
                <Button variant="default" size="lg">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-elevated transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{order.orderNumber}</CardTitle>
                      <p className="text-muted-foreground mt-1">
                        Ordered from {order.supplier}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        Ordered on {new Date(order.orderDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary mb-2">
                        ₹{order.total}
                      </div>
                      <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                        {getStatusIcon(order.status)}
                        {order.status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium mb-2">Items ({order.items.length})</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{item.name} × {item.quantity} {item.unit}</span>
                          <span className="font-medium">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Delivery Address
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        {order.deliveryAddress}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        Tracking
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        {order.trackingId}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expected: {new Date(order.deliveryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                    <a href={`tel:${order.supplierPhone}`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Call Supplier
                      </Button>
                    </a>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Chat Support
                    </Button>
                    {order.status === "delivered" && (
                      <Button variant="default" size="sm">
                        Reorder
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Order Statistics */}
        {filteredOrders.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {orders.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ₹{orders.reduce((sum, order) => sum + order.total, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Spent</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {orders.filter(o => o.status === "delivered").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {orders.filter(o => o.status !== "delivered").length}
                  </div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;