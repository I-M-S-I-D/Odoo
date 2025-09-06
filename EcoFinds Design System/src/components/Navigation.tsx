import { Home, Search, Plus, ShoppingCart, User, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

type Page = 'home' | 'browse' | 'add' | 'cart' | 'dashboard';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  cartCount: number;
}

export function Navigation({ currentPage, onPageChange, cartCount }: NavigationProps) {
  const navItems = [
    { id: 'home' as Page, icon: Home, label: 'Home' },
    { id: 'browse' as Page, icon: Search, label: 'Browse' },
    { id: 'add' as Page, icon: Plus, label: 'Sell' },
    { id: 'cart' as Page, icon: ShoppingCart, label: 'Cart' },
    { id: 'dashboard' as Page, icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-4 py-2 z-50">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                <div className="relative">
                  <Icon className="w-6 h-6" />
                  {item.id === 'cart' && cartCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </div>
                  )}
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:flex flex-col w-64 bg-white border-r border-stone-200 h-screen sticky top-0">
        {/* Logo */}
        <div className="p-6 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-800">EcoFinds</h1>
              <p className="text-sm text-stone-600">Sustainable marketplace</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start text-left h-12 ${
                  isActive 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                }`}
                onClick={() => onPageChange(item.id)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {item.id === 'cart' && cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-500 text-white text-xs h-5 w-5 p-0 flex items-center justify-center">
                        {cartCount > 9 ? '9+' : cartCount}
                      </Badge>
                    )}
                  </div>
                  <span>{item.label}</span>
                </div>
              </Button>
            );
          })}
        </div>

        {/* User Info at Bottom */}
        <div className="p-4 border-t border-stone-200">
          <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-800 truncate">Alex Green</p>
              <p className="text-xs text-stone-600">Eco Warrior • Level 2</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}