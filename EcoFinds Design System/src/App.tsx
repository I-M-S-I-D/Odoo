import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { AuthPage } from "./components/pages/AuthPage";
import { HomePage } from "./components/pages/HomePage";
import { BrowsePage } from "./components/pages/BrowsePage";
import { ProductDetailPage } from "./components/pages/ProductDetailPage";
import { AddProductPage } from "./components/pages/AddProductPage";
import { CartPage } from "./components/pages/CartPage";
import { DashboardPage } from "./components/pages/DashboardPage";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  verified: boolean;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  condition: "Excellent" | "Good" | "Fair";
  category: string;
  description: string;
  images: string[];
  seller: {
    id: string;
    name: string;
    avatar?: string;
    verified: boolean;
    rating: number;
  };
  location: string;
  co2Saved: number;
  createdAt: Date;
  saved?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

type Page =
  | "auth"
  | "home"
  | "browse"
  | "product"
  | "add"
  | "cart"
  | "dashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("auth");
  const [selectedProductId, setSelectedProductId] =
    useState<string>("1");
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: "1",
      title: "Vintage Leather Jacket",
      price: 89,
      originalPrice: 159,
      condition: "Excellent",
      category: "Fashion",
      description:
        "Beautiful vintage leather jacket in excellent condition. Genuine leather with minimal wear.",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      ],
      seller: {
        id: "seller1",
        name: "Sarah Johnson",
        verified: true,
        rating: 4.8,
      },
      location: "Brooklyn, NY",
      co2Saved: 2.5,
      createdAt: new Date("2024-01-15"),
      saved: false,
    },
    {
      id: "2",
      title: 'MacBook Pro 13" 2020',
      price: 899,
      originalPrice: 1299,
      condition: "Good",
      category: "Electronics",
      description:
        "MacBook Pro in good working condition. Minor scratches but fully functional.",
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      ],
      seller: {
        id: "seller2",
        name: "Mike Chen",
        verified: true,
        rating: 4.9,
      },
      location: "San Francisco, CA",
      co2Saved: 45.2,
      createdAt: new Date("2024-01-20"),
      saved: true,
    },
    {
      id: "3",
      title: "Wooden Coffee Table",
      price: 120,
      originalPrice: 249,
      condition: "Good",
      category: "Furniture",
      description:
        "Solid wood coffee table with beautiful grain. Perfect for living room.",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      ],
      seller: {
        id: "seller3",
        name: "Emma Wilson",
        verified: false,
        rating: 4.3,
      },
      location: "Austin, TX",
      co2Saved: 12.8,
      createdAt: new Date("2024-01-18"),
      saved: false,
    },
    {
      id: "4",
      title: "Nike Running Shoes",
      price: 45,
      originalPrice: 89,
      condition: "Fair",
      category: "Fashion",
      description:
        "Comfortable running shoes with some wear on the soles but still good for training.",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      ],
      seller: {
        id: "seller4",
        name: "James Rodriguez",
        verified: true,
        rating: 4.6,
      },
      location: "Miami, FL",
      co2Saved: 3.2,
      createdAt: new Date("2024-01-22"),
      saved: false,
    },
  ];

  const addToCart = (
    product: Product,
    quantity: number = 1,
  ) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  };

  const updateCartQuantity = (
    productId: string,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const login = (email: string, password: string) => {
    // Mock login
    setUser({
      id: "user1",
      name: "Alex Green",
      email,
      verified: true,
    });
    setCurrentPage("home");
  };

  const signup = (
    name: string,
    email: string,
    password: string,
  ) => {
    // Mock signup
    setUser({
      id: "user1",
      name,
      email,
      verified: false,
    });
    setCurrentPage("home");
  };

  const logout = () => {
    setUser(null);
    setCurrentPage("auth");
    setCart([]);
  };

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage("product");
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase() ===
        selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const selectedProduct = mockProducts.find(
    (p) => p.id === selectedProductId,
  );

  const renderCurrentPage = () => {
    if (!user && currentPage !== "auth") {
      return <AuthPage onLogin={login} onSignup={signup} />;
    }

    switch (currentPage) {
      case "auth":
        return <AuthPage onLogin={login} onSignup={signup} />;
      case "home":
        return (
          <HomePage
            products={mockProducts}
            onProductClick={navigateToProduct}
            onAddToCart={addToCart}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        );
      case "browse":
        return (
          <BrowsePage
            products={filteredProducts}
            onProductClick={navigateToProduct}
            onAddToCart={addToCart}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        );
      case "product":
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => setCurrentPage("browse")}
          />
        ) : (
          <div>Product not found</div>
        );
      case "add":
        return (
          <AddProductPage
            onBack={() => setCurrentPage("home")}
          />
        );
      case "cart":
        return (
          <CartPage
            cartItems={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
          />
        );
      case "dashboard":
        return <DashboardPage user={user!} onLogout={logout} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="bg-white min-h-screen relative">
          {renderCurrentPage()}
          {user && (
            <Navigation
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              cartCount={cart.reduce(
                (sum, item) => sum + item.quantity,
                0,
              )}
            />
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {user && (
          <Navigation
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            cartCount={cart.reduce(
              (sum, item) => sum + item.quantity,
              0,
            )}
          />
        )}
        <div className="flex-1 bg-white">
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
}