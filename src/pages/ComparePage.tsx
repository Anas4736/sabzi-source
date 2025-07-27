import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Star, Search, Plus, Minus, ShoppingCart, ArrowLeft, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Mock comparison data
const mockSuppliers = [
  {
    id: 1,
    name: "Rajesh Spices & Co.",
    location: "Delhi",
    rating: 4.8,
    phone: "+91 98765 43210",
    products: {
      "Red Chili Powder": { price: 180, unit: "kg", inStock: true, discount: 10 },
      "Turmeric Powder": { price: 220, unit: "kg", inStock: true, discount: 0 },
      "Garam Masala": { price: 350, unit: "kg", inStock: true, discount: 15 },
      "Coriander Powder": { price: 160, unit: "kg", inStock: false, discount: 0 }
    }
  },
  {
    id: 2,
    name: "Delhi Spice Market",
    location: "Delhi",
    rating: 4.6,
    phone: "+91 87654 32109",
    products: {
      "Red Chili Powder": { price: 175, unit: "kg", inStock: true, discount: 5 },
      "Turmeric Powder": { price: 210, unit: "kg", inStock: true, discount: 8 },
      "Garam Masala": { price: 380, unit: "kg", inStock: true, discount: 0 },
      "Coriander Powder": { price: 155, unit: "kg", inStock: true, discount: 12 }
    }
  },
  {
    id: 3,
    name: "Premium Spices Ltd",
    location: "Mumbai",
    rating: 4.9,
    phone: "+91 76543 21098",
    products: {
      "Red Chili Powder": { price: 195, unit: "kg", inStock: true, discount: 0 },
      "Turmeric Powder": { price: 240, unit: "kg", inStock: true, discount: 5 },
      "Garam Masala": { price: 320, unit: "kg", inStock: true, discount: 20 },
      "Coriander Powder": { price: 170, unit: "kg", inStock: true, discount: 0 }
    }
  }
];

const ComparePage = () => {
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([1, 2, 3]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    "Red Chili Powder",
    "Turmeric Powder",
    "Garam Masala"
  ]);
  const [cart, setCart] = useState<{[key: string]: number}>({});

  const allProducts = Array.from(
    new Set(
      mockSuppliers.flatMap(supplier => Object.keys(supplier.products))
    )
  );

  const filteredProducts = allProducts.filter(product =>
    product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSupplier = (supplierId: number) => {
    setSelectedSuppliers(prev =>
      prev.includes(supplierId)
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const toggleProduct = (product: string) => {
    setSelectedProducts(prev =>
      prev.includes(product)
        ? prev.filter(p => p !== product)
        : [...prev, product]
    );
  };

  const addToCart = (supplierId: number, product: string) => {
    const key = `${supplierId}-${product}`;
    setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    toast({
      title: "Added to cart",
      description: `${product} added to cart`,
    });
  };

  const getBestPrice = (product: string) => {
    const prices = selectedSuppliers
      .map(id => mockSuppliers.find(s => s.id === id))
      .filter(Boolean)
      .map(supplier => supplier!.products[product])
      .filter(Boolean)
      .map(p => p.price * (1 - p.discount / 100));
    
    return Math.min(...prices);
  };

  const getWorstPrice = (product: string) => {
    const prices = selectedSuppliers
      .map(id => mockSuppliers.find(s => s.id === id))
      .filter(Boolean)
      .map(supplier => supplier!.products[product])
      .filter(Boolean)
      .map(p => p.price * (1 - p.discount / 100));
    
    return Math.max(...prices);
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
          <nav className="hidden md:flex space-x-6">
            <Link to="/suppliers" className="text-foreground hover:text-primary transition-colors">
              Suppliers
            </Link>
            <Link to="/compare" className="text-primary font-medium">
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
        <div className="mb-6">
          <Link to="/suppliers" className="flex items-center text-primary hover:text-primary/80 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Suppliers
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Compare Prices</h1>
          <p className="text-muted-foreground">Find the best deals across multiple suppliers</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Supplier Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Suppliers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockSuppliers.map((supplier) => (
                  <div key={supplier.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`supplier-${supplier.id}`}
                      checked={selectedSuppliers.includes(supplier.id)}
                      onCheckedChange={() => toggleSupplier(supplier.id)}
                    />
                    <Label htmlFor={`supplier-${supplier.id}`} className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">{supplier.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {supplier.rating} • {supplier.location}
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Product Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <div key={product} className="flex items-center space-x-2">
                      <Checkbox
                        id={`product-${product}`}
                        checked={selectedProducts.includes(product)}
                        onCheckedChange={() => toggleProduct(product)}
                      />
                      <Label htmlFor={`product-${product}`} className="cursor-pointer text-sm">
                        {product}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Comparison Table */}
          <div className="lg:col-span-3">
            {selectedProducts.length === 0 || selectedSuppliers.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Select items to compare</h3>
                <p className="text-muted-foreground">
                  Choose at least one supplier and one product to start comparing prices
                </p>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        ₹{selectedProducts.reduce((sum, product) => sum + getBestPrice(product), 0).toFixed(0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Best Total Price</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600">
                        ₹{selectedProducts.reduce((sum, product) => sum + getWorstPrice(product), 0).toFixed(0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Highest Total Price</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">
                        ₹{(selectedProducts.reduce((sum, product) => sum + getWorstPrice(product), 0) - 
                           selectedProducts.reduce((sum, product) => sum + getBestPrice(product), 0)).toFixed(0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Potential Savings</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Comparison Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Price Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-medium">Product</th>
                            {selectedSuppliers.map(id => {
                              const supplier = mockSuppliers.find(s => s.id === id);
                              return (
                                <th key={id} className="text-center p-3 font-medium min-w-[200px]">
                                  <div>{supplier?.name}</div>
                                  <div className="text-sm text-muted-foreground flex items-center justify-center">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                    {supplier?.rating}
                                  </div>
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {selectedProducts.map((product) => {
                            const bestPrice = getBestPrice(product);
                            return (
                              <tr key={product} className="border-b">
                                <td className="p-3 font-medium">{product}</td>
                                {selectedSuppliers.map(id => {
                                  const supplier = mockSuppliers.find(s => s.id === id);
                                  const productData = supplier?.products[product];
                                  if (!productData) {
                                    return (
                                      <td key={id} className="p-3 text-center">
                                        <Badge variant="outline">Not Available</Badge>
                                      </td>
                                    );
                                  }

                                  const finalPrice = productData.price * (1 - productData.discount / 100);
                                  const isBestPrice = Math.abs(finalPrice - bestPrice) < 0.01;

                                  return (
                                    <td key={id} className="p-3">
                                      <div className="text-center space-y-2">
                                        <div className={`text-lg font-bold ${isBestPrice ? 'text-green-600' : 'text-foreground'}`}>
                                          ₹{Math.round(finalPrice)}
                                          <span className="text-sm font-normal">/{productData.unit}</span>
                                          {isBestPrice && (
                                            <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                                              Best Price
                                            </Badge>
                                          )}
                                        </div>
                                        {productData.discount > 0 && (
                                          <div className="text-sm">
                                            <span className="line-through text-muted-foreground">
                                              ₹{productData.price}
                                            </span>
                                            <Badge className="ml-1 bg-red-100 text-red-800 border-red-200">
                                              -{productData.discount}%
                                            </Badge>
                                          </div>
                                        )}
                                        <div className="flex gap-1 justify-center">
                                          <Button
                                            size="sm"
                                            disabled={!productData.inStock}
                                            onClick={() => addToCart(id, product)}
                                          >
                                            {productData.inStock ? "Add to Cart" : "Out of Stock"}
                                          </Button>
                                          <a href={`tel:${supplier?.phone}`}>
                                            <Button variant="outline" size="sm">
                                              <Phone className="h-4 w-4" />
                                            </Button>
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="flex gap-4">
                  <Link to="/cart">
                    <Button size="lg" className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      View Cart ({Object.values(cart).reduce((sum, qty) => sum + qty, 0)} items)
                    </Button>
                  </Link>
                  <Link to="/suppliers">
                    <Button variant="outline" size="lg">
                      Add More Suppliers
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;