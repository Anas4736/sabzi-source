import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Phone, ShoppingCart, Heart, Share2, Clock, Truck, Award } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Mock data - replace with Supabase query
const mockSupplier = {
  id: 1,
  name: "Rajesh Spices & Co.",
  location: "Chandni Chowk, Delhi",
  rating: 4.8,
  reviewCount: 156,
  phone: "+91 98765 43210",
  verified: true,
  image: "🌶️",
  description: "Premium quality spices and masalas supplier serving Delhi NCR for over 25 years. We source directly from farmers and ensure highest quality standards.",
  minOrder: "₹500",
  deliveryTime: "1-2 days",
  coverage: "Delhi NCR",
  established: "1998",
  products: [
    { id: 1, name: "Red Chili Powder", price: 180, unit: "kg", image: "🌶️", inStock: true, discount: 10 },
    { id: 2, name: "Turmeric Powder", price: 220, unit: "kg", image: "🟡", inStock: true, discount: 0 },
    { id: 3, name: "Garam Masala", price: 350, unit: "kg", image: "🥄", inStock: true, discount: 15 },
    { id: 4, name: "Coriander Powder", price: 160, unit: "kg", image: "🌿", inStock: false, discount: 0 },
    { id: 5, name: "Cumin Seeds", price: 480, unit: "kg", image: "🟤", inStock: true, discount: 5 },
    { id: 6, name: "Black Pepper", price: 850, unit: "kg", image: "⚫", inStock: true, discount: 0 }
  ],
  reviews: [
    { id: 1, author: "Amit Kumar", rating: 5, comment: "Excellent quality spices. Always fresh and aromatic.", date: "2 days ago", verified: true },
    { id: 2, author: "Priya Sharma", rating: 4, comment: "Good prices and fast delivery. Recommended!", date: "1 week ago", verified: true },
    { id: 3, author: "Ravi Singh", rating: 5, comment: "Best supplier in Delhi. Consistent quality for my restaurant.", date: "2 weeks ago", verified: true }
  ]
};

const SupplierDetailPage = () => {
  const { id } = useParams();
  const [supplier] = useState(mockSupplier); // Replace with Supabase query
  const [cartItems, setCartItems] = useState<number[]>([]);

  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId]);
    toast({
      title: "Added to cart",
      description: "Product has been added to your cart.",
    });
  };

  const addToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: "Supplier has been added to your wishlist.",
    });
  };

  const shareSupplier = () => {
    toast({
      title: "Link copied",
      description: "Supplier link has been copied to clipboard.",
    });
  };

  if (!supplier) {
    return <div>Supplier not found</div>;
  }

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
            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="default">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/suppliers" className="hover:text-primary">Suppliers</Link>
          <span>/</span>
          <span>{supplier.name}</span>
        </div>

        {/* Supplier Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-4xl">
                  {supplier.image}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-foreground">{supplier.name}</h1>
                      {supplier.verified && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {supplier.location}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{supplier.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({supplier.reviews.length} reviews)
                        </span>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        Since {supplier.established}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={addToWishlist}>
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={shareSupplier}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <a href={`tel:${supplier.phone}`}>
                      <Button variant="secondary" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Call Now
                      </Button>
                    </a>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{supplier.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">Delivery</div>
                      <div className="text-muted-foreground">{supplier.deliveryTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">Min Order</div>
                      <div className="text-muted-foreground">{supplier.minOrder}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">Coverage</div>
                      <div className="text-muted-foreground">{supplier.coverage}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">Contact</div>
                      <div className="text-muted-foreground">{supplier.phone}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Products ({supplier.products.length})</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({supplier.reviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supplier.products.map((product) => (
                <Card key={product.id} className="hover:shadow-elevated transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-2xl">
                        {product.image}
                      </div>
                      {product.discount > 0 && (
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          ₹{product.price}
                          <span className="text-sm text-muted-foreground font-normal">/{product.unit}</span>
                        </div>
                        {product.discount > 0 && (
                          <div className="text-sm text-muted-foreground line-through">
                            ₹{Math.round(product.price / (1 - product.discount / 100))}
                          </div>
                        )}
                      </div>
                      <Badge variant={product.inStock ? "secondary" : "destructive"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>

                    <Button 
                      className="w-full" 
                      disabled={!product.inStock}
                      onClick={() => addToCart(product.id)}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-4">
              {supplier.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{review.author}</h4>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              ✓ Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupplierDetailPage;