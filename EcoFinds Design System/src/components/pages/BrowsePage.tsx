import { useState } from 'react';
import { Search, Filter, Grid, List, ArrowUpDown } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import type { Product } from '../../App';
import { ProductCard } from '../ProductCard';

interface BrowsePageProps {
  products: Product[];
  onProductClick: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BrowsePage({ 
  products, 
  onProductClick, 
  onAddToCart, 
  searchQuery, 
  onSearchChange,
  selectedCategory,
  onCategoryChange
}: BrowsePageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const categories = ['all', 'Fashion', 'Electronics', 'Furniture', 'Books', 'Sports'];
  const conditions = ['Excellent', 'Good', 'Fair'];

  // Filter and sort products
  let filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(product.condition);
    const matchesVerified = !showVerifiedOnly || product.seller.verified;
    return matchesPrice && matchesCondition && matchesVerified;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'eco-impact':
        return b.co2Saved - a.co2Saved;
      case 'rating':
        return b.seller.rating - a.seller.rating;
      case 'newest':
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedConditions([]);
    setShowVerifiedOnly(false);
    onCategoryChange('all');
  };

  return (
    <div className="pb-20 lg:pb-0 bg-white min-h-screen">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-6">Browse Products</h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white border-none text-stone-800 placeholder:text-stone-500 lg:h-12 lg:text-lg"
            />
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="p-4 lg:p-8 border-b border-stone-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 lg:gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap lg:px-4 lg:py-2 lg:text-sm ${
                  selectedCategory === category 
                    ? 'bg-emerald-600 hover:bg-emerald-700' 
                    : 'border-stone-300 hover:border-emerald-600'
                }`}
                onClick={() => onCategoryChange(category)}
              >
                {category === 'all' ? 'All' : category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-4 lg:p-8 border-b border-stone-200">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 py-4">
                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range</label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-stone-600 mt-1">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Condition</label>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition}
                          checked={selectedConditions.includes(condition)}
                          onCheckedChange={() => toggleCondition(condition)}
                        />
                        <label htmlFor={condition} className="text-sm">{condition}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Sellers */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={showVerifiedOnly}
                    onCheckedChange={setShowVerifiedOnly}
                  />
                  <label htmlFor="verified" className="text-sm">Verified sellers only</label>
                </div>

                <Button onClick={clearFilters} variant="outline" className="w-full">
                  Clear All Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low</SelectItem>
              <SelectItem value="price-high">Price: High</SelectItem>
              <SelectItem value="eco-impact">Eco Impact</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

          <div className="flex gap-1 bg-stone-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-2 py-1 lg:px-3 lg:py-2"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-2 py-1 lg:px-3 lg:py-2"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 lg:px-8 py-2">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm lg:text-base text-stone-600">
            {filteredProducts.length} products found
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3 lg:space-y-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex gap-3 lg:gap-4 p-3 lg:p-4 border border-stone-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onClick={() => onProductClick(product.id)}>
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-stone-800 truncate lg:text-lg mb-1">{product.title}</h3>
                    <p className="text-sm lg:text-base text-stone-600 mb-2 font-bold">${product.price}</p>
                    <div className="flex items-center gap-2 text-xs lg:text-sm mb-2">
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                        <Leaf className="w-3 h-3 mr-1" />
                        {product.co2Saved}kg CO₂
                      </Badge>
                      <Badge variant="outline">{product.condition}</Badge>
                    </div>
                    <p className="text-xs lg:text-sm text-stone-500">{product.seller.name}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white self-end lg:px-4 lg:py-2"
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 lg:py-20">
              <p className="text-stone-500 lg:text-lg mb-4">No products match your filters.</p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="lg:px-6 lg:py-3"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}