import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Leaf, Recycle, Heart } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
}

export function AuthPage({ onLogin, onSignup }: AuthPageProps) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginData.email, loginData.password);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSignup(signupData.name, signupData.email, signupData.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50 flex flex-col items-center justify-center p-4 lg:grid lg:grid-cols-2 lg:gap-12 lg:px-8">
      {/* Desktop Hero Section */}
      <div className="hidden lg:flex flex-col justify-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-stone-800 mb-6">
            Shop <span className="text-emerald-600">Sustainably</span>,<br />
            Live <span className="text-emerald-600">Responsibly</span>
          </h1>
          <p className="text-xl text-stone-600 mb-8 leading-relaxed">
            Join thousands of eco-conscious users who are making a difference through 
            circular economy. Every purchase saves the planet one item at a time.
          </p>
          
          {/* Large Impact Stats for Desktop */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Recycle className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-emerald-800 mb-1">150k+</div>
              <p className="text-stone-600">Items Saved</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-emerald-800 mb-1">320t</div>
              <p className="text-stone-600">CO₂ Saved</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-emerald-800 mb-1">50k+</div>
              <p className="text-stone-600">Happy Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Form Section */}
      <div className="w-full max-w-md lg:max-w-sm">
        {/* Mobile Logo and Brand */}
        <div className="lg:hidden text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-emerald-600 p-3 rounded-full">
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">EcoFinds</h1>
          <p className="text-stone-600 px-4">
            Discover sustainable treasures while reducing your carbon footprint
          </p>
        </div>

        {/* Mobile Impact Stats */}
        <div className="lg:hidden flex justify-center gap-6 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Recycle className="w-5 h-5 text-emerald-600 mr-1" />
              <span className="font-bold text-emerald-800">50k+</span>
            </div>
            <p className="text-xs text-stone-600">Items Saved</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Leaf className="w-5 h-5 text-emerald-600 mr-1" />
              <span className="font-bold text-emerald-800">120t</span>
            </div>
            <p className="text-xs text-stone-600">CO₂ Saved</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Heart className="w-5 h-5 text-emerald-600 mr-1" />
              <span className="font-bold text-emerald-800">25k+</span>
            </div>
            <p className="text-xs text-stone-600">Happy Users</p>
          </div>
        </div>

        {/* Desktop Logo */}
        <div className="hidden lg:flex items-center justify-center mb-8">
          <div className="bg-emerald-600 p-3 rounded-full mr-3">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-emerald-800">EcoFinds</h1>
        </div>

        {/* Auth Forms */}
        <Card className="w-full bg-white/90 backdrop-blur-sm border-stone-200 shadow-lg lg:shadow-xl">
          <CardHeader className="text-center pb-4 lg:pb-6">
            <CardTitle className="text-xl lg:text-2xl text-stone-800">Join the Movement</CardTitle>
          </CardHeader>
          <CardContent className="lg:px-8 lg:pb-8">
            <Tabs defaultValue="login" className="space-y-4 lg:space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-stone-100 lg:h-12">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white lg:text-base"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white lg:text-base"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 lg:space-y-6">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      className="bg-white border-stone-300 focus:border-emerald-500 lg:h-12 lg:text-base"
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      className="bg-white border-stone-300 focus:border-emerald-500 lg:h-12 lg:text-base"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white lg:h-12 lg:text-base"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4 lg:space-y-6">
                  <div>
                    <Input
                      type="text"
                      placeholder="Full name"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      required
                      className="bg-white border-stone-300 focus:border-emerald-500 lg:h-12 lg:text-base"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                      className="bg-white border-stone-300 focus:border-emerald-500 lg:h-12 lg:text-base"
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      className="bg-white border-stone-300 focus:border-emerald-500 lg:h-12 lg:text-base"
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      required
                      className="bg-white border-stone-300 focus:border-emerald-500 lg:h-12 lg:text-base"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white lg:h-12 lg:text-base"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-xs lg:text-sm text-stone-500 text-center mt-4 px-4">
          By joining, you agree to help build a more sustainable future through circular economy
        </p>
      </div>
    </div>
  );
}