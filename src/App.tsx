// App.tsx
import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/CartContext';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import OrderDetailPage from './pages/OrderDetailPage';
import MapPage from './pages/mapPage';
import mockData from './data/data.json';
import { useAuth } from './hooks/useAuth';
import type { Category, Branch } from './types';
import OrderSuccessPage from './pages/OrderSuccessPage';

function AppContent() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const { totalItems } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    // Cargar datos iniciales
    setAllCategories(mockData.categories);
    const mainCategories = mockData.categories.filter(cat => !cat.parent_id)
      .sort((a, b) => a.name.localeCompare(b.name));
    const openBranches = mockData.branches.filter(branch => branch.is_open);
    setCategories(mainCategories);
    setBranches(openBranches);

    // Cargar sucursal guardada
    const savedBranch = localStorage.getItem('selectedBranch');
    if (savedBranch) setSelectedBranch(savedBranch);
  }, []);

  // Funciones para el Header
  const handleSearch = (query: string) => {
    navigate(`/buscar?q=${encodeURIComponent(query)}`);
  };

    const handleBranchClick = () => {
    navigate('/mapa');
  };

    const handleAuthSuccess = () => {
    navigate('/'); // o '/perfil', '/carrito', etc.
  };


  const handleCartClick = () => {};

  const handleMapClick = () => {};

    const handleLoginClick = () => {
    if (user) {
      logout();
    } else {
      navigate('/auth');
    }
  };

   const handleProfileClick = () => {
    navigate('/perfil');
  };

   const handleOrderClick = (orderId: string) => {
    navigate(`/pedido/${orderId}`);
  };

  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header
     
        selectedBranch={selectedBranch}
       allCategories={allCategories}
        categories={categories}
       
      />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categorias/:slug" element={<CategoryPage />} />
          <Route path="/categorias/:parentSlug/:slug" element={<CategoryPage />} />
          <Route path="/producto/:slug" element={<ProductPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage/>} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="/sucursales" element={<BranchesPage />} />
          <Route path="/auth" element={<AuthPage  onSuccess={handleAuthSuccess} />} />
          <Route path="/sobre-nosotros" element={<AboutPage />} />
          <Route path="/perfil" element={<ProfilePage onLogout={logout} onBranchClick={handleMapClick} onOrderClick={handleOrderClick} />} />
          <Route path="/pedido/:orderId" element={<OrderDetailPage onBack={() => {}} />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer onMapClick={handleMapClick} onAboutClick={() => {}} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;