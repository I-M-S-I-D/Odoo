import { useState } from 'react';
import { Search, Leaf, TrendingUp, Award, Heart } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import type { Product } from '../../App';
import { ProductCard } from '../ProductCard';

interface HomePageProps {
  products: Product[];
  onProductClick: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HomePage({ products, onProductClick, onAddToCart, searchQuery, onSearchChange }: HomePageProps) {
  const categories = ['Fashion', 'Electronics', 'Furniture', 'Books', 'Sports'];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const featuredProducts = products.slice(0, 2);
  const trendingProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products.slice(2);

  const totalCO2Saved = products.reduce((sum, product) => sum + product.co2Saved, 0);

  return (
    <div className="pb-20 lg:pb-0 bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-4 lg:p-8 rounded-b-3xl lg:rounded-b-none">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold lg:hidden">EcoFinds</h1>
              <h1 className="hidden lg:block text-4xl font-bold mb-2">Welcome to EcoFinds</h1>
              <p className="text-emerald-100 text-sm lg:text-lg">
                {window.innerWidth >= 1024 ? 'Discover sustainable treasures while reducing your carbon footprint' : 'Sustainable marketplace'}
              </p>
            </div>
            <div className="bg-emerald-500 p-3 rounded-full lg:hidden">
              <Leaf className="w-6 h-6" />
            </div>
          </div>
        
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search sustainable products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white border-none text-stone-800 placeholder:text-stone-500 lg:h-12 lg:text-lg"
            />
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 mt-4 lg:mt-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Leaf className="w-4 h-4 lg:w-5 lg:h-5 mr-1" />
                <span className="font-bold lg:text-xl">{totalCO2Saved.toFixed(1)}kg</span>
              </div>
              <p className="text-xs lg:text-sm text-emerald-100">CO₂ Saved</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Award className="w-4 h-4 lg:w-5 lg:h-5 mr-1" />
                <span className="font-bold lg:text-xl">{products.length}</span>
              </div>
              <p className="text-xs lg:text-sm text-emerald-100">Products</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Heart className="w-4 h-4 lg:w-5 lg:h-5 mr-1" />
                <span className="font-bold lg:text-xl">2.5k</span>
              </div>
              <p className="text-xs lg:text-sm text-emerald-100">Community</p>
            </div>
            <div className="hidden lg:block text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-5 h-5 mr-1" />
                <span className="font-bold text-xl">150k</span>
              </div>
              <p className="text-sm text-emerald-100">Items Sold</p>
            </div>
            <div className="hidden lg:block text-center">
              <div className="flex items-center justify-center mb-1">
                <Leaf className="w-5 h-5 mr-1" />
                <span className="font-bold text-xl">80%</span>
              </div>
              <p className="text-sm text-emerald-100">CO₂ Reduction</p>
            </div>
            <div className="hidden lg:block text-center">
              <div className="flex items-center justify-center mb-1">
                <Award className="w-5 h-5 mr-1" />
                <span className="font-bold text-xl">4.9★</span>
              </div>
              <p className="text-sm text-emerald-100">User Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-3 lg:mb-6">
            <h2 className="text-lg lg:text-2xl font-semibold text-stone-800">Categories</h2>
            <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600" />
          </div>
          <div className="flex gap-2 lg:gap-3 overflow-x-auto pb-2">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap lg:px-4 lg:py-2 lg:text-sm ${
                selectedCategory === null 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : 'border-stone-300 hover:border-emerald-600'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All Items
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap lg:px-4 lg:py-2 lg:text-sm ${
                  selectedCategory === category 
                    ? 'bg-emerald-600 hover:bg-emerald-700' 
                    : 'border-stone-300 hover:border-emerald-600'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Featured Products - Desktop Left Column */}
            <div className="lg:col-span-4 mb-6">
              <h2 className="text-lg lg:text-xl font-semibold text-stone-800 mb-3 lg:mb-6">Featured Today</h2>
              <div className="space-y-3 lg:space-y-4">
                {featuredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden border-stone-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => onProductClick(product.id)}>
                    <CardContent className="p-3 lg:p-4">
                      <div className="flex gap-3">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-semibold text-stone-800 truncate lg:text-lg">{product.title}</h3>
                            <button className="text-stone-400 hover:text-red-500 ml-2">
                              <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
                            </button>
                          </div>
                          <p className="text-sm lg:text-base text-stone-600 mb-2 font-bold">${product.price}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                              <Leaf className="w-3 h-3 mr-1" />
                              {product.co2Saved}kg CO₂
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {product.condition}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Product Grid - Main Content */}
            <div className="lg:col-span-8">
              <h2 className="text-lg lg:text-xl font-semibold text-stone-800 mb-3 lg:mb-6">
                {selectedCategory ? `${selectedCategory} Items` : 'Trending Products'}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
                {trendingProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={onProductClick}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}