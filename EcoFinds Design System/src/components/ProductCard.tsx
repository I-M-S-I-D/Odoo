import { Heart, Leaf, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Product } from '../App';

interface ProductCardProps {
  product: Product;
  onProductClick: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onProductClick, onAddToCart }: ProductCardProps) {
  const savings = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Card className="overflow-hidden border-stone-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer lg:hover:shadow-lg">
      <div onClick={() => onProductClick(product.id)}>
        <div className="relative">
          <div className="aspect-square bg-stone-100 overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>
          
          {/* Save Button */}
          <button className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm transition-colors">
            <Heart className={`w-4 h-4 ${product.saved ? 'text-red-500 fill-red-500' : 'text-stone-500'}`} />
          </button>
          
          {/* CO2 Badge */}
          <div className="absolute top-2 left-2">
            <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white text-xs px-2 py-1">
              <Leaf className="w-3 h-3 mr-1" />
              {product.co2Saved}kg CO₂
            </Badge>
          </div>
          
          {/* Savings Badge */}
          {savings > 0 && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-orange-500 hover:bg-orange-500 text-white text-xs">
                -{savings}%
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-3 lg:p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-stone-800 text-sm lg:text-base line-clamp-2 leading-tight">
              {product.title}
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-stone-900 lg:text-lg">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs lg:text-sm text-stone-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <Badge variant="outline" className="text-xs">
                {product.condition}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span className="truncate">{product.seller.name}</span>
              {product.seller.verified && (
                <div className="w-3 h-3 bg-emerald-500 rounded-full flex-shrink-0" />
              )}
            </div>
          </div>
        </CardContent>
      </div>
      
      {/* Add to Cart Button */}
      <div className="px-3 pb-3 lg:px-4 lg:pb-4">
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs lg:text-sm py-2 lg:py-2.5"
        >
          <ShoppingCart className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}