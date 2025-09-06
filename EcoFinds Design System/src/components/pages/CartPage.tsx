import { useState } from 'react';
import { Minus, Plus, Trash2, Leaf, ShoppingBag, CreditCard, Truck, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import type { CartItem } from '../../App';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function CartPage({ cartItems, onUpdateQuantity, onRemoveItem }: CartPageProps) {
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const promoDiscount = isPromoApplied ? subtotal * 0.1 : 0; // 10% discount
  const total = subtotal + shipping - promoDiscount;
  const totalCO2Saved = cartItems.reduce((sum, item) => sum + (item.product.co2Saved * item.quantity), 0);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'eco10') {
      setIsPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  const handleCheckout = () => {
    alert(`Checkout successful! 🎉\n\nTotal: $${total.toFixed(2)}\nCO₂ Impact: ${totalCO2Saved.toFixed(1)}kg saved`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="pb-20 bg-white min-h-screen">
        <div className="p-4 border-b border-stone-200">
          <h1 className="text-xl font-bold text-stone-800">Shopping Cart</h1>
        </div>
        
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-stone-100 p-6 rounded-full mb-4">
            <ShoppingBag className="w-12 h-12 text-stone-400" />
          </div>
          <h2 className="text-xl font-semibold text-stone-800 mb-2">Your cart is empty</h2>
          <p className="text-stone-600 text-center mb-6">
            Start shopping for sustainable products to reduce your environmental impact
          </p>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 w-full max-w-sm">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span className="font-medium text-emerald-800">Did you know?</span>
            </div>
            <p className="text-sm text-emerald-700">
              Buying second-hand reduces waste and saves up to 80% of CO₂ emissions compared to new items
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-white min-h-screen">
      {/* Header */}
      <div className="p-4 border-b border-stone-200 bg-white sticky top-0 z-10">
        <h1 className="text-xl font-bold text-stone-800">Shopping Cart</h1>
        <p className="text-sm text-stone-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Cart Items */}
        {cartItems.map((item) => (
          <Card key={item.product.id} className="overflow-hidden border-stone-200">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-stone-800 truncate mb-1">
                    {item.product.title}
                  </h3>
                  <p className="text-sm text-stone-600 mb-2">
                    {item.product.seller.name} • {item.product.condition}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="font-bold text-stone-900">${item.product.price}</span>
                      {item.product.originalPrice && (
                        <span className="text-xs text-stone-500 line-through">
                          ${item.product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-stone-100 rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                        onClick={() => onRemoveItem(item.product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Environmental Impact */}
                  <div className="mt-2">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-xs">
                      <Leaf className="w-3 h-3 mr-1" />
                      {(item.product.co2Saved * item.quantity).toFixed(1)}kg CO₂ saved
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Promo Code */}
        <Card className="border-stone-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-stone-800 mb-2">Promo Code</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code (try ECO10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={applyPromoCode}
                disabled={isPromoApplied}
              >
                Apply
              </Button>
            </div>
            {isPromoApplied && (
              <p className="text-sm text-green-600 mt-2">✓ ECO10 applied - 10% off!</p>
            )}
          </CardContent>
        </Card>

        {/* Environmental Impact Summary */}
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-emerald-600 p-2 rounded-full">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-emerald-800">Your Environmental Impact</h3>
                <p className="text-sm text-emerald-700">Making a difference with every purchase</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-emerald-800">{totalCO2Saved.toFixed(1)}kg</p>
                <p className="text-xs text-emerald-700">CO₂ emissions saved</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-800">{cartItems.length}</p>
                <p className="text-xs text-emerald-700">Items saved from waste</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Checkout Section */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <Card className="border-stone-200 shadow-lg bg-white">
          <CardContent className="p-4 space-y-3">
            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {shipping > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
              )}
              {shipping === 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              )}
              {isPromoApplied && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Promo discount</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center gap-4 py-2 text-xs text-stone-600">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="w-3 h-3" />
                <span>Fast Ship</span>
              </div>
              <div className="flex items-center gap-1">
                <Leaf className="w-3 h-3" />
                <span>Eco-Friendly</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-semibold"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Checkout • ${total.toFixed(2)}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}