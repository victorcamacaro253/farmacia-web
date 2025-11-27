import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SearchPage from './pages/SearchPage';
import BranchesPage from './pages/BranchesPage';
import AuthPage from './pages/AuthPage';
import mockData from './data/data.json';
import { useAuth } from './hooks/useAuth';
import type { Category, Product, Branch } from './types';
import MapPage from './pages/mapPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import OrderDetailPage from './pages/OrderDetailPage';


type Page =
  | { type: 'home' }
  | { type: 'category'; slug: string; subSlug?: string }
  | { type: 'product'; slug: string }
  | { type: 'cart' }
  | { type: 'checkout' }
  | { type: 'search'; query: string }
  | { type: 'branches' }
  | { type: 'auth' }
  | { type: 'about' }
  | { type: 'profile' }
  | { type: 'order'; orderId: string }
  | { type: 'map' }; 

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>({ type: 'home' });
  const [categories, setCategories] = useState<Category[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
   const [allCategories, setAllCategories] = useState<Category[]>([]); 
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const { addToCart, totalItems } = useCart();
   
  const { user, logout } = useAuth(); // 👈 user viene del hook

  useEffect(() => {
    loadInitialData();
    const savedBranch = localStorage.getItem('selectedBranch');
    if (savedBranch) setSelectedBranch(savedBranch);
  }, []);

  
  const loadInitialData = () => {

        setAllCategories(mockData.categories);

    // Cargar categorías principales (sin parent_id)
    const mainCategories = mockData.categories.filter(cat => !cat.parent_id)
      .sort((a, b) => a.name.localeCompare(b.name));
    
    // Cargar sucursales abiertas
    const openBranches = mockData.branches.filter(branch => branch.is_open);

    setCategories(mainCategories);
    setBranches(openBranches);
  };

  const handleSearch = (query: string) => {
    setCurrentPage({ type: 'search', query });
  };

  const handleCategoryClick = (slug: string, parentSlug?: string) => {
  if (parentSlug) {
    // Es una subcategoría → navega con padre + sub
    setCurrentPage({ type: 'category', slug: parentSlug, subSlug: slug });
  } else {
    // Es una categoría raíz
    setCurrentPage({ type: 'category', slug });
  }
};

  const handleProductClick = (slug: string) => {
    setCurrentPage({ type: 'product', slug });
  };

  const handleBranchClick = () => {
    setCurrentPage({ type: 'branches' });
  };

  const handleProfileClick = () => {
  setCurrentPage({ type: 'profile' });
};

  const handleCartClick = () => {
    setCurrentPage({ type: 'cart' });
  };

  const handleMapClick = () => {
  setCurrentPage({ type: 'map' });
};

const handleAboutClick = () => {
  setCurrentPage({ type: 'about' });
};

const handleOrderClick = (orderId: string) => {
  setCurrentPage({ type: 'order', orderId });
};

  const handleLoginClick = () => {
  if (user) {
    logout(); // ← cierra sesión correctamente
  } else {
    setCurrentPage({ type: 'auth' });
  }
};

  const handleCheckout = () => {
    if (!user) {
      setCurrentPage({ type: 'auth' });
    } else {
      setCurrentPage({ type: 'checkout' });
    }
  };

 


  const handleCheckoutSuccess = () => {
    alert('¡Pedido realizado con éxito! Gracias por tu compra.');
    setCurrentPage({ type: 'home' });
  };

  const handleAuthSuccess = () => {
    setCurrentPage({ type: 'home' });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const renderPage = () => {
    switch (currentPage.type) {
      case 'home':
        return (
          <HomePage
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onBranchClick={handleBranchClick}
            onCategoryClick={handleCategoryClick}
          />
        );
      case 'category':
        return (
          <CategoryPage
            categorySlug={currentPage.slug}
             subcategorySlug={currentPage.subSlug} 
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
          />
        );
      case 'product':
        return (
          <ProductPage
            productSlug={currentPage.slug}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
          />
        );
      case 'cart':
        return (
          <CartPage
            onCheckout={handleCheckout}
            onContinueShopping={() => setCurrentPage({ type: 'home' })}
          />
        );
      case 'checkout':
        return <CheckoutPage onSuccess={handleCheckoutSuccess} />;
      case 'search':
        return (
          <SearchPage
            searchQuery={currentPage.query}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
          />
        );
      case 'branches':
        return <BranchesPage />;
      case 'map':
      return <MapPage />;
      case 'about':
      return <AboutPage onBranchClick={handleAboutClick} />;
      case 'auth':
        return <AuthPage onSuccess={handleAuthSuccess} />;
      case 'order':
      return <OrderDetailPage orderId={currentPage.orderId} onBack={() => setCurrentPage({ type: 'profile' })} />;
      case 'profile':
        return (
          <ProfilePage
            onLogout={logout}
            onBranchClick={handleMapClick}
           onOrderClick={handleOrderClick}
          />
        );
      default:
        return (
          <HomePage
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onBranchClick={handleBranchClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onSearch={handleSearch}
        cartItemCount={totalItems}
        selectedBranch={selectedBranch}
        onBranchClick={handleMapClick}
        onCartClick={handleCartClick}
        onLoginClick={handleLoginClick}
        isLoggedIn={!!user}
         onLogout={logout}
        allCategories={allCategories}
        onCategoryClick={handleCategoryClick}
        // onSubcategoryClick={handleSubcategoryClick}
        categories={categories}
       onProfileClick={handleProfileClick}
        user={user}
      />
    {/* <CategoryNav
        categories={categories}
        allCategories={allCategories} 
        onCategoryClick={handleCategoryClick}
         onSubcategoryClick={handleSubcategoryClick}
      /> 
      */}
      <main className="flex-1 ">{renderPage()}</main>
      <Footer   onMapClick={handleMapClick} onAboutClick={handleAboutClick} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;