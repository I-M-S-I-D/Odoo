import { useState } from 'react';
import { Settings, Edit, Heart, Package, DollarSign, Leaf, Star, LogOut, Shield, Camera, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import type { User, Product } from '../../App';

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
}

export function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user listings
  const mockListings: Product[] = [
    {
      id: 'user-1',
      title: 'Vintage Camera',
      price: 150,
      originalPrice: 299,
      condition: 'Excellent',
      category: 'Electronics',
      description: 'Beautiful vintage film camera in excellent condition.',
      images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400'],
      seller: {
        id: user.id,
        name: user.name,
        verified: user.verified,
        rating: 4.8
      },
      location: 'Brooklyn, NY',
      co2Saved: 8.5,
      createdAt: new Date('2024-01-25'),
      saved: false
    }
  ];

  // Mock user purchases
  const mockPurchases: Product[] = [
    {
      id: 'purchase-1',
      title: 'Wooden Coffee Table',
      price: 120,
      originalPrice: 249,
      condition: 'Good',
      category: 'Furniture',
      description: 'Solid wood coffee table with beautiful grain.',
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'],
      seller: {
        id: 'seller3',
        name: 'Emma Wilson',
        verified: false,
        rating: 4.3
      },
      location: 'Austin, TX',
      co2Saved: 12.8,
      createdAt: new Date('2024-01-18'),
      saved: false
    }
  ];

  const totalEarnings = mockListings.reduce((sum, item) => sum + item.price, 0);
  const totalCO2Impact = [...mockListings, ...mockPurchases].reduce((sum, item) => sum + item.co2Saved, 0);
  const totalSavings = mockPurchases.reduce((sum, item) => 
    sum + ((item.originalPrice || item.price) - item.price), 0);

  return (
    <div className="pb-20 bg-stone-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-4 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarFallback className="bg-emerald-500 text-white text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold">{user.name}</h1>
                {user.verified && <Shield className="w-5 h-5 text-emerald-200" />}
              </div>
              <p className="text-emerald-100 text-sm">{user.email}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">4.8 (23 reviews)</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-emerald-700">
            <Edit className="w-5 h-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="w-4 h-4 mr-1" />
              <span className="font-bold">${totalEarnings}</span>
            </div>
            <p className="text-xs text-emerald-100">Earned</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Leaf className="w-4 h-4 mr-1" />
              <span className="font-bold">{totalCO2Impact.toFixed(1)}kg</span>
            </div>
            <p className="text-xs text-emerald-100">CO₂ Impact</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Package className="w-4 h-4 mr-1" />
              <span className="font-bold">{mockListings.length}</span>
            </div>
            <p className="text-xs text-emerald-100">Listed</p>
          </div>
        </div>
      </div>

      <div className="p-4 -mt-6">
        {/* Achievement Card */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 p-3 rounded-full">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-900">Eco Warrior</h3>
                <p className="text-sm text-amber-700">
                  You've saved {totalCO2Impact.toFixed(1)}kg of CO₂ emissions!
                </p>
              </div>
              <Badge className="bg-amber-500 hover:bg-amber-500 text-white ml-auto">
                Level 2
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="listings"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Listings
            </TabsTrigger>
            <TabsTrigger 
              value="purchases"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Purchases
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">${totalSavings}</div>
                  <p className="text-sm text-stone-600">Money Saved</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">{mockPurchases.length}</div>
                  <p className="text-sm text-stone-600">Items Bought</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Listed Vintage Camera</p>
                    <p className="text-xs text-stone-600">2 days ago</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Active</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Purchased Coffee Table</p>
                    <p className="text-xs text-stone-600">1 week ago</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Delivered</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="listings" className="space-y-4">
            {mockListings.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-stone-800 mb-1">{item.title}</h3>
                      <p className="text-lg font-bold text-emerald-600 mb-2">${item.price}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{item.condition}</Badge>
                        <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                          <Leaf className="w-3 h-3 mr-1" />
                          {item.co2Saved}kg CO₂
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Purchases Tab */}
          <TabsContent value="purchases" className="space-y-4">
            {mockPurchases.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-stone-800 mb-1">{item.title}</h3>
                      <p className="text-sm text-stone-600 mb-1">From {item.seller.name}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-stone-900">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-stone-500 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-xs">
                        <Leaf className="w-3 h-3 mr-1" />
                        Saved {item.co2Saved}kg CO₂
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                      <Badge className="bg-green-100 text-green-800 text-xs">Delivered</Badge>
                      <Button variant="outline" size="sm">Review</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5 text-stone-600" />
                    <div>
                      <p className="font-medium">Profile Photo</p>
                      <p className="text-sm text-stone-600">Update your profile picture</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-stone-600" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-stone-600">Brooklyn, NY</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-stone-600" />
                    <div>
                      <p className="font-medium">Account Verification</p>
                      <p className="text-sm text-stone-600">
                        {user.verified ? 'Verified seller' : 'Get verified to build trust'}
                      </p>
                    </div>
                  </div>
                  {!user.verified && (
                    <Button variant="outline" size="sm">Verify</Button>
                  )}
                </div>
                
                <Separator />
                
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={onLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}