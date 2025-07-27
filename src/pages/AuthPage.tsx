import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Phone, Mail, User, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"vendor" | "supplier">("vendor");
  
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    businessName: "",
    location: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - replace with Supabase auth
    toast({
      title: "Login successful!",
      description: "Welcome back to StreetSource",
    });
    
    // Redirect based on user type
    if (userType === "vendor") {
      navigate("/vendor-dashboard");
    } else {
      navigate("/supplier-dashboard");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup - replace with Supabase auth
    toast({
      title: "Account created successfully!",
      description: "Welcome to StreetSource family",
    });
    
    // Redirect based on user type
    if (userType === "vendor") {
      navigate("/vendor-dashboard");
    } else {
      navigate("/supplier-dashboard");
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Feature coming soon",
      description: `${provider} login will be available soon.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link to="/" className="flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="shadow-elevated">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-2xl">🍛</span>
            </div>
            <div>
              <CardTitle className="text-2xl">Welcome to StreetSource</CardTitle>
              <CardDescription>
                Connect with trusted suppliers across India
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">I am a:</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={userType === "vendor" ? "default" : "outline"}
                  onClick={() => setUserType("vendor")}
                  className="justify-start"
                >
                  <User className="h-4 w-4 mr-2" />
                  Vendor
                </Button>
                <Button
                  variant={userType === "supplier" ? "default" : "outline"}
                  onClick={() => setUserType("supplier")}
                  className="justify-start"
                >
                  <User className="h-4 w-4 mr-2" />
                  Supplier
                </Button>
              </div>
            </div>

            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email or Phone</Label>
                    <Input
                      id="login-email"
                      type="text"
                      placeholder="your@email.com or +91 98765 43210"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Login as {userType === "vendor" ? "Vendor" : "Supplier"}
                  </Button>
                </form>

                <div className="text-center">
                  <Button variant="link" className="text-sm">
                    Forgot password?
                  </Button>
                </div>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        placeholder="Your name"
                        value={signupForm.name}
                        onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone</Label>
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-business">
                      {userType === "vendor" ? "Shop/Stall Name" : "Business Name"}
                    </Label>
                    <Input
                      id="signup-business"
                      placeholder={userType === "vendor" ? "e.g., Sharma Chat Corner" : "e.g., ABC Spices Pvt Ltd"}
                      value={signupForm.businessName}
                      onChange={(e) => setSignupForm({...signupForm, businessName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-location">Location</Label>
                    <Input
                      id="signup-location"
                      placeholder="City, State"
                      value={signupForm.location}
                      onChange={(e) => setSignupForm({...signupForm, location: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Create {userType === "vendor" ? "Vendor" : "Supplier"} Account
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </TabsContent>
            </Tabs>

            {/* Social Login */}
            <div className="space-y-4">
              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-2 text-sm text-muted-foreground">or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleSocialLogin("Google")}
                  className="flex items-center justify-center gap-2"
                >
                  <span className="text-base">🇬</span>
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleSocialLogin("Phone")}
                  className="flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Phone
                </Button>
              </div>
            </div>

            {/* Benefits for user type */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  {userType === "vendor" ? "🍛 Vendor Benefits:" : "🏭 Supplier Benefits:"}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {userType === "vendor" ? (
                    <>
                      <li>• Access to 500+ verified suppliers</li>
                      <li>• Compare prices instantly</li>
                      <li>• Easy group ordering</li>
                      <li>• Fast delivery tracking</li>
                    </>
                  ) : (
                    <>
                      <li>• Reach 2000+ street food vendors</li>
                      <li>• Manage inventory easily</li>
                      <li>• Receive bulk orders</li>
                      <li>• Build trusted relationships</li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;