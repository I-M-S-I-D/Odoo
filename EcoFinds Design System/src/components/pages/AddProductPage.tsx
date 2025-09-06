import { useState } from 'react';
import { ArrowLeft, Camera, X, Leaf, DollarSign, Package, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface AddProductPageProps {
  onBack: () => void;
}

export function AddProductPage({ onBack }: AddProductPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    price: '',
    originalPrice: '',
    images: [] as string[],
    location: ''
  });

  const categories = [
    'Fashion', 'Electronics', 'Furniture', 'Books', 'Sports', 'Home & Garden', 'Toys', 'Art & Collectibles'
  ];

  const conditions = [
    { value: 'Excellent', description: 'Like new, minimal wear' },
    { value: 'Good', description: 'Minor signs of use' },
    { value: 'Fair', description: 'Noticeable wear but functional' }
  ];

  const handleImageUpload = () => {
    // Mock image upload
    const mockImages = [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400'
    ];
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...mockImages.slice(0, 3 - prev.images.length)]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const calculateCO2Impact = () => {
    const price = parseFloat(formData.price) || 0;
    // Mock calculation based on category and price
    const categoryMultipliers = {
      'Electronics': 15,
      'Fashion': 3,
      'Furniture': 8,
      'Books': 1,
      'Sports': 4,
      'Home & Garden': 5,
      'Toys': 2,
      'Art & Collectibles': 1
    };
    const multiplier = categoryMultipliers[formData.category as keyof typeof categoryMultipliers] || 2;
    return Math.round((price / 100) * multiplier * 10) / 10;
  };

  const progressPercentage = (currentStep / 3) * 100;

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Mock submission
    alert('Product listed successfully! 🌱');
    onBack();
  };

  return (
    <div className="pb-20 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-emerald-600 text-white">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-emerald-700">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold">Sell Your Item</h1>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Progress Bar */}
      <div className="p-4 bg-emerald-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-emerald-800">Step {currentStep} of 3</span>
          <span className="text-sm text-emerald-600">{Math.round(progressPercentage)}% complete</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="p-4 space-y-4">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-600" />
                  Product Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Product Title
                  </label>
                  <Input
                    placeholder="e.g., iPhone 12 Pro 128GB Blue"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe the condition, features, and why you're selling..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Category
                    </label>
                    <Select value={formData.category} onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, category: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Location
                    </label>
                    <Input
                      placeholder="City, State"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={nextStep} 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={!formData.title || !formData.description || !formData.category}
            >
              Continue to Photos
            </Button>
          </div>
        )}

        {/* Step 2: Photos & Condition */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-emerald-600" />
                  Photos & Condition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Product Photos
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg border"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 w-6 h-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    {formData.images.length < 3 && (
                      <Button
                        variant="outline"
                        className="aspect-square flex-col gap-2"
                        onClick={handleImageUpload}
                      >
                        <Camera className="w-6 h-6" />
                        <span className="text-xs">Add Photo</span>
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-stone-500">
                    Add up to 3 photos. First photo will be the main image.
                  </p>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Condition
                  </label>
                  <div className="space-y-2">
                    {conditions.map(condition => (
                      <div
                        key={condition.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.condition === condition.value
                            ? 'border-emerald-600 bg-emerald-50'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, condition: condition.value }))}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{condition.value}</p>
                            <p className="text-sm text-stone-600">{condition.description}</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            formData.condition === condition.value
                              ? 'border-emerald-600 bg-emerald-600'
                              : 'border-stone-300'
                          }`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={prevStep} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={nextStep} 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                disabled={formData.images.length === 0 || !formData.condition}
              >
                Set Price
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Pricing */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Your Price
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Original Price (optional)
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    />
                  </div>
                </div>

                {formData.price && parseFloat(formData.price) > 0 && (
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">Environmental Impact</span>
                    </div>
                    <p className="text-sm text-emerald-700 mb-2">
                      By selling this item instead of throwing it away, you'll help save:
                    </p>
                    <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white">
                      ~{calculateCO2Impact()}kg CO₂ emissions
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Listing Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-600">Title:</span>
                  <span className="font-medium">{formData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Category:</span>
                  <span className="font-medium">{formData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Condition:</span>
                  <span className="font-medium">{formData.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Price:</span>
                  <span className="font-medium">${formData.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Photos:</span>
                  <span className="font-medium">{formData.images.length} uploaded</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={prevStep} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                disabled={!formData.price || parseFloat(formData.price) <= 0}
              >
                List Item
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}