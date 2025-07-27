import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Mock cart data - replace with local state or Supabase
const mockCartItems = [
  {
    id: 1,
    productId: 1,
    name: "Red Chili Powder",
    supplier: "Rajesh Spices & Co.",
    price: 180,
    unit: "kg",
    quantity: 2,
    image: "🌶️",
    discount: 10
  },
  {
    id: 2,
    productId: 3,
    name: "Garam Masala",
    supplier: "Rajesh Spices & Co.",
    price: 350,
    unit: "kg",
    quantity: 1,
    image: "🥄",
    discount: 15
  },
  {
    id: 3,
    productId: 5,
    name: "Cumin Seeds",
    supplier: "Rajesh Spices & Co.",
    price: 480,
    unit: "kg",
    quantity: 1,
    image: "🟤",
    discount: 5
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "first10") {
      toast({
        title: "Promo code applied!",
        description: "You got 10% off on your first order.",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is not valid.",
        variant: "destructive",
      });
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.price * (1 - item.discount / 100);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => {
      const originalPrice = item.price * item.quantity;
      const discountedPrice = item.price * (1 - item.discount / 100) * item.quantity;
      return total + (originalPrice - discountedPrice);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const savings = calculateSavings();
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

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
              <Button variant="default">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/suppliers" className="flex items-center text-primary hover:text-primary/80 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <ShoppingCart className="h-8 w-8" />
            Your Cart
            <Badge variant="secondary" className="text-sm">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </Badge>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start adding items from our verified suppliers
            </p>
            <Link to="/suppliers">
              <Button variant="default" size="lg">
                Browse Suppliers
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl">
                        {item.image}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">by {item.supplier}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xl font-bold text-primary">
                            ₹{Math.round(item.price * (1 - item.discount / 100))}
                          </span>
                          <span className="text-sm text-muted-foreground">/{item.unit}</span>
                          {item.discount > 0 && (
                            <>
                              <span className="text-sm text-muted-foreground line-through">
                                ₹{item.price}
                              </span>
                              <Badge className="bg-red-100 text-red-800 border-red-200">
                                -{item.discount}%
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            ₹{Math.round(item.price * (1 - item.discount / 100) * item.quantity)}
                          </div>
                          {item.discount > 0 && (
                            <div className="text-sm text-green-600">
                              Save ₹{Math.round((item.price * item.discount / 100) * item.quantity)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{Math.round(subtotal)}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>You Save</span>
                      <span>-₹{Math.round(savings)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  
                  {deliveryFee > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Add ₹{Math.round(500 - subtotal)} more for free delivery
                    </p>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{Math.round(total)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Promo Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Try "FIRST10" for 10% off your first order
                  </p>
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <Link to="/checkout" className="block">
                <Button variant="default" size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;