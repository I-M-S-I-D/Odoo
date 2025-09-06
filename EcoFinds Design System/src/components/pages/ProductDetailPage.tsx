import { useState } from 'react';
import { ArrowLeft, Heart, Share, ShoppingCart, Leaf, Shield, Star, MapPin, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { ProductCard } from '../ProductCard';
import type { Product, Review } from '../../App';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

// Mock related products (in a real app, this would come from props or API)
const mockRelatedProducts: Product[] = [
  {
    id: "related1",
    title: "Designer Wool Coat",
    price: 120,
    originalPrice: 200,
    condition: "Excellent",
    category: "Fashion",
    description: "Luxury wool coat in perfect condition",
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"],
    seller: { id: "s1", name: "Fashion Store", verified: true, rating: 4.7 },
    location: "NYC",
    co2Saved: 3.2,
    createdAt: new Date(),
    stock: "In Stock",
    reviews: []
  },
  {
    id: "related2", 
    title: "Vintage Denim Jacket",
    price: 65,
    originalPrice: 95,
    condition: "Good",
    category: "Fashion",
    description: "Classic denim jacket with character",
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400"],
    seller: { id: "s2", name: "Vintage Shop", verified: true, rating: 4.5 },
    location: "LA",
    co2Saved: 2.1,
    createdAt: new Date(),
    stock: "Low Stock",
    reviews: []
  }
];

export function ProductDetailPage({ product, onAddToCart, onBack }: ProductDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(product.saved || false);
  const [userRating, setUserRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [relatedProductIndex, setRelatedProductIndex] = useState(0);

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

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleSubmitReview = () => {
    if (userRating > 0 && reviewComment.trim()) {
      // In a real app, this would submit to an API
      console.log("Review submitted:", { rating: userRating, comment: reviewComment });
      setUserRating(0);
      setReviewComment("");
    }
  };

  const navigateRelatedProducts = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setRelatedProductIndex(prev => prev > 0 ? prev - 1 : mockRelatedProducts.length - 1);
    } else {
      setRelatedProductIndex(prev => prev < mockRelatedProducts.length - 1 ? prev + 1 : 0);
    }
  };

  return (
    <div className="pb-24 lg:pb-0 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-background border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={toggleSave}>
            <Heart className={`w-5 h-5 ${isSaved ? 'text-red-500 fill-red-500' : 'text-muted-foreground'}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative">
        <div className="w-full h-72 sm:h-96 lg:h-[32rem] bg-stone-100 overflow-hidden flex items-center justify-center">
          <img
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="w-auto h-full max-h-full object-contain"
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

          <Separator />

          {/* Reviews Section */}
          <div>
            <h3 className="font-semibold text-stone-800 mb-4">Reviews & Ratings</h3>
            
            {/* Add Review Form */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Leave a Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Star Rating */}
                <div>
                  <p className="text-sm text-stone-600 mb-2">Rate this product:</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleStarClick(rating)}
                        className="transition-colors"
                      >
                        <Star 
                          className={`w-6 h-6 ${
                            rating <= userRating 
                              ? 'text-yellow-500 fill-yellow-500' 
                              : 'text-stone-300'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Comment */}
                <div>
                  <p className="text-sm text-stone-600 mb-2">Your review:</p>
                  <Textarea
                    placeholder="Share your experience with this product..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button 
                  onClick={handleSubmitReview}
                  disabled={userRating === 0 || !reviewComment.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Submit Review
                </Button>
              </CardContent>
            </Card>

            {/* Existing Reviews */}
            <div className="space-y-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-stone-100 text-stone-700 text-sm">
                            {review.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-stone-800">{review.userName}</h4>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-stone-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-stone-500">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                          <p className="text-stone-600 text-sm">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-stone-500 text-center py-4">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Related Products */}
          <div>
            <h3 className="font-semibold text-stone-800 mb-4">Related Products</h3>
            <div className="relative">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {mockRelatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="flex-shrink-0 w-48">
                    <ProductCard
                      product={relatedProduct}
                      onProductClick={() => {}} // Would navigate to that product
                      onAddToCart={onAddToCart}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Add to Cart Button */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 lg:bottom-4">
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