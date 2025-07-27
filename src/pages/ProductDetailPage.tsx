import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, MapPin, Phone, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Mock product data - replace with Supabase query
const mockProduct = {
  id: 1,
  name: "Red Chili Powder",
  supplier: {
    id: 1,
    name: "Rajesh Spices & Co.",
    location: "Chandni Chowk, Delhi",
    rating: 4.8,
    phone: "+91 98765 43210",
    verified: true
  },
  price: 180,
  originalPrice: 200,
  unit: "kg",
  discount: 10,
  image: "🌶️",
  inStock: true,
  stockQuantity: 500,
  description: "Premium quality red chili powder made from carefully selected red chilies. Perfect for street food vendors who need consistent heat and flavor in their dishes.",
  features: [
    "100% Pure and Natural",
    "No artificial colors or preservatives",
    "Perfect heat level for street food",
    "Hygienically processed and packed",
    "Long shelf life",
    "Consistent quality"
  ],
  specifications: {
    "Net Weight": "1 kg",
    "Shelf Life": "12 months",
    "Storage": "Store in cool, dry place",
    "Origin": "Rajasthan, India",
    "Processing": "Machine ground",
    "Packaging": "Food grade pouch"
  },
  reviews: [
    {
      id: 1,
      author: "Amit Kumar",
      rating: 5,
      comment: "Excellent quality! Perfect heat level for my chaat stall. Customers love the taste.",
      date: "2 days ago",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      author: "Priya Sharma",
      rating: 4,
      comment: "Good quality spice. Fast delivery and reasonable price. Will order again.",
      date: "1 week ago",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      author: "Ravi Singh",
      rating: 5,
      comment: "Best red chili powder I've used. Consistent quality every time I order.",
      date: "2 weeks ago",
      verified: true,
      helpful: 15
    }
  ],
  relatedProducts: [
    { id: 2, name: "Turmeric Powder", price: 220, image: "🟡" },
    { id: 3, name: "Garam Masala", price: 350, image: "🥄" },
    { id: 4, name: "Coriander Powder", price: 160, image: "🌿" }
  ]
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product] = useState(mockProduct); // Replace with Supabase query
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} kg of ${product.name} added to cart`,
    });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} ${isWishlisted ? "removed from" : "added to"} your wishlist`,
    });
  };

  const shareProduct = () => {
    toast({
      title: "Link copied",
      description: "Product link has been copied to clipboard",
    });
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const finalPrice = product.price;
  const totalPrice = finalPrice * quantity;

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
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/suppliers" className="hover:text-primary">Suppliers</Link>
          <span>/</span>
          <Link to={`/supplier/${product.supplier.id}`} className="hover:text-primary">
            {product.supplier.name}
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Image and Basic Info */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="flex items-center justify-center">
                    <div className="w-48 h-48 bg-gradient-primary rounded-2xl flex items-center justify-center text-8xl">
                      {product.image}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                      <Link to={`/supplier/${product.supplier.id}`} className="text-primary hover:text-primary/80">
                        by {product.supplier.name}
                      </Link>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold text-primary">₹{finalPrice}</span>
                        <span className="text-lg text-muted-foreground">/{product.unit}</span>
                        {product.discount > 0 && (
                          <>
                            <span className="text-lg text-muted-foreground line-through">
                              ₹{product.originalPrice}
                            </span>
                            <Badge className="bg-red-100 text-red-800 border-red-200">
                              -{product.discount}% OFF
                            </Badge>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">{product.supplier.rating}</span>
                          <span className="text-sm text-muted-foreground ml-1">
                            ({product.reviews.length} reviews)
                          </span>
                        </div>
                        <Badge variant={product.inStock ? "secondary" : "destructive"}>
                          {product.inStock ? `${product.stockQuantity} ${product.unit} available` : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground">{product.description}</p>

                    {/* Quantity and Actions */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <label className="font-medium">Quantity:</label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          >
                            -
                          </Button>
                          <span className="w-12 text-center font-medium">{quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            +
                          </Button>
                          <span className="text-muted-foreground">{product.unit}</span>
                        </div>
                      </div>

                      <div className="text-xl font-bold">
                        Total: ₹{totalPrice}
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          className="flex-1"
                          size="lg"
                          disabled={!product.inStock}
                          onClick={addToCart}
                        >
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={toggleWishlist}
                        >
                          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={shareProduct}
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details Tabs */}
            <Tabs defaultValue="features" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="features">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between p-3 border rounded">
                          <span className="font-medium">{key}:</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{review.author}</h4>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  ✓ Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1 mb-2">
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
                        <p className="text-muted-foreground mb-3">{review.comment}</p>
                        <div className="text-sm text-muted-foreground">
                          {review.helpful} people found this helpful
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Supplier Info */}
            <Card>
              <CardHeader>
                <CardTitle>Supplier Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Link to={`/supplier/${product.supplier.id}`}>
                    <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                      {product.supplier.name}
                    </h3>
                  </Link>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {product.supplier.location}
                  </div>
                  {product.supplier.verified && (
                    <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">
                      ✓ Verified Supplier
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{product.supplier.rating}</span>
                  </div>
                  <a href={`tel:${product.supplier.phone}`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call
                    </Button>
                  </a>
                </div>

                <Link to={`/supplier/${product.supplier.id}`}>
                  <Button variant="outline" className="w-full">
                    View All Products
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Delivery Time:</span>
                  <span className="font-medium">1-2 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Min Order:</span>
                  <span className="font-medium">₹500</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
              </CardContent>
            </Card>

            {/* Related Products */}
            <Card>
              <CardHeader>
                <CardTitle>Related Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {product.relatedProducts.map((relatedProduct) => (
                  <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                    <div className="flex items-center space-x-3 p-3 border rounded hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-lg">
                        {relatedProduct.image}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{relatedProduct.name}</div>
                        <div className="text-sm text-primary">₹{relatedProduct.price}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;