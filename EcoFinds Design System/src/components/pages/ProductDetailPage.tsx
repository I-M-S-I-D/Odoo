import { useState } from 'react';
import { ArrowLeft, Heart, Share, ShoppingCart, Leaf, Shield, Star, MapPin, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback } from '../ui/avatar';
import type { Product } from '../../App';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export function ProductDetailPage({ product, onAddToCart, onBack }: ProductDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(product.saved || false);

  const savings = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="pb-24 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-stone-200">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={toggleSave}>
            <Heart className={`w-5 h-5 ${isSaved ? 'text-red-500 fill-red-500' : 'text-stone-500'}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative">
        <div className="aspect-square bg-stone-100 overflow-hidden">
          <img
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Image Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white">
            <Leaf className="w-3 h-3 mr-1" />
            {product.co2Saved}kg CO₂ saved
          </Badge>
        </div>
        
        {savings > 0 && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-orange-500 hover:bg-orange-500 text-white">
              {savings}% off retail
            </Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="space-y-4">
          {/* Title and Price */}
          <div>
            <h1 className="text-2xl font-bold text-stone-800 mb-2">{product.title}</h1>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-stone-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-stone-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {product.condition} condition
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {product.category}
              </Badge>
            </div>
          </div>

          {/* Location and Date */}
          <div className="flex items-center gap-4 text-sm text-stone-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{product.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Listed {formatDate(product.createdAt)}</span>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold text-stone-800 mb-2">Description</h3>
            <p className="text-stone-600 leading-relaxed">{product.description}</p>
          </div>

          <Separator />

          {/* Environmental Impact */}
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-emerald-600 p-2 rounded-full">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-800">Environmental Impact</h3>
                  <p className="text-sm text-emerald-700">By buying pre-owned, you're making a difference</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-emerald-800">{product.co2Saved}kg</p>
                  <p className="text-xs text-emerald-700">CO₂ emissions saved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-800">1</p>
                  <p className="text-xs text-emerald-700">Item kept from landfill</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Seller Info */}
          <div>
            <h3 className="font-semibold text-stone-800 mb-3">Seller Information</h3>
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-emerald-100 text-emerald-800">
                  {product.seller.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-stone-800">{product.seller.name}</h4>
                  {product.seller.verified && (
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs text-emerald-600">Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-stone-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{product.seller.rating}</span>
                  <span>(125 reviews)</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Add to Cart Button */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold shadow-lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart • ${product.price}
        </Button>
      </div>
    </div>
  );
}