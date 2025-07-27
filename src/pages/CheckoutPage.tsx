import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin, CreditCard, Truck, CheckCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    landmark: ""
  });

  // Mock cart summary
  const orderSummary = {
    items: [
      { name: "Red Chili Powder", quantity: 2, price: 360 },
      { name: "Garam Masala", quantity: 1, price: 298 },
      { name: "Cumin Seeds", quantity: 1, price: 456 }
    ],
    subtotal: 1114,
    savings: 76,
    deliveryFee: 0,
    total: 1114
  };

  const handleAddressChange = (field: string, value: string) => {
    setDeliveryAddress(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    // Validate form
    if (!deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required delivery details.",
        variant: "destructive",
      });
      return;
    }

    // Simulate order placement
    toast({
      title: "Order placed successfully!",
      description: "You will receive a confirmation call within 10 minutes.",
    });

    // Redirect to success page or orders page
    navigate("/orders");
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
              <Button variant="default">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/cart" className="flex items-center text-primary hover:text-primary/80 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <CheckCircle className="h-8 w-8" />
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={deliveryAddress.name}
                      onChange={(e) => handleAddressChange("name", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={deliveryAddress.phone}
                      onChange={(e) => handleAddressChange("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Textarea
                    id="address"
                    value={deliveryAddress.address}
                    onChange={(e) => handleAddressChange("address", e.target.value)}
                    placeholder="House/Shop number, area, locality"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={deliveryAddress.city}
                      onChange={(e) => handleAddressChange("city", e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={deliveryAddress.pincode}
                      onChange={(e) => handleAddressChange("pincode", e.target.value)}
                      placeholder="110001"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="landmark">Landmark (Optional)</Label>
                  <Input
                    id="landmark"
                    value={deliveryAddress.landmark}
                    onChange={(e) => handleAddressChange("landmark", e.target.value)}
                    placeholder="Near metro station, mall, etc."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Cash on Delivery</div>
                          <div className="text-sm text-muted-foreground">
                            Pay when your order arrives
                          </div>
                        </div>
                        <Badge variant="secondary">Recommended</Badge>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                    <RadioGroupItem value="upi" id="upi" disabled />
                    <Label htmlFor="upi" className="flex-1 cursor-not-allowed">
                      <div>
                        <div className="font-medium">UPI Payment</div>
                        <div className="text-sm text-muted-foreground">
                          GooglePay, PhonePe, Paytm (Coming Soon)
                        </div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                    <RadioGroupItem value="card" id="card" disabled />
                    <Label htmlFor="card" className="flex-1 cursor-not-allowed">
                      <div>
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="text-sm text-muted-foreground">
                          Visa, MasterCard, RuPay (Coming Soon)
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Expected Delivery</span>
                  <span className="font-medium">1-2 business days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery Partner</span>
                  <span className="font-medium">Rajesh Spices & Co.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tracking</span>
                  <span className="font-medium">SMS & WhatsApp updates</span>
                </div>
                <Separator />
                <p className="text-sm text-muted-foreground">
                  💡 Our supplier will call you to confirm the delivery time and address.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-medium">₹{item.price}</div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{orderSummary.subtotal}</span>
                </div>
                
                <div className="flex justify-between text-green-600">
                  <span>You Save</span>
                  <span>-₹{orderSummary.savings}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-green-600">FREE</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{orderSummary.total}</span>
                </div>
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button 
              variant="default" 
              size="lg" 
              className="w-full"
              onClick={handlePlaceOrder}
            >
              Place Order (₹{orderSummary.total})
            </Button>

            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>✅ 100% Secure payments</p>
                  <p>✅ Easy returns & refunds</p>
                  <p>✅ Quality guarantee</p>
                  <p>✅ 24/7 customer support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;