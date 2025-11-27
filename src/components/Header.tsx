import { Search, MapPin, User, ShoppingCart, Menu, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { Category } from '../types';
import { AnimatePresence, motion } from 'framer-motion';

interface HeaderProps {
  onSearch: (query: string) => void;
  cartItemCount: number;
  selectedBranch: string | null;
  onBranchClick: () => void;
  onCartClick: () => void;
  onLoginClick: () => void;
  onLogout: () => void; 
  isLoggedIn: boolean;
  allCategories: Category[];
  categories: Category[];
  onCategoryClick: (slug: string, parentSlug?: string) => void;
  onProfileClick?: () => void; 
  user: { full_name: string } | null;
}

export default function Header({
  onSearch,
  cartItemCount,
  selectedBranch,
  onBranchClick,
  onCartClick,
  onLoginClick,
  isLoggedIn,
  onLogout,
  categories,
  allCategories,
  onCategoryClick,
  onProfileClick,
  user,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const getSubcategories = (parentId: string): Category[] => {
    return allCategories.filter(cat => cat.parent_id === parentId);
  };

  const handleMobileCategoryClick = (slug: string) => {
    onCategoryClick(slug);
    setIsMobileMenuOpen(false);
    setIsMobileCategoriesOpen(false);
  };

  const handleMobileSubcategoryClick = (subSlug: string, parentSlug: string) => {
    onCategoryClick(subSlug, parentSlug); // 👈
    setIsMobileMenuOpen(false);
    setIsMobileCategoriesOpen(null);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Banner superior */}
      <div className="bg-blue-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <span className="text-xs sm:text-sm">Envío gratis en compras mayores a $15.000</span>
          <span className="hidden sm:inline text-xs sm:text-sm">Lunes a Sábados: 8:00 - 22:00</span>
        </div>
      </div>

      {/* Header principal */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Menú hamburguesa */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-blue-600 text-white px-2 py-1 rounded-lg font-bold text-xl">
              F+
            </div>
            <span className="text-xl font-bold text-blue-600 hidden sm:block">
              FarmaSalud
            </span>
          </a>

          {/* País - Oculto en móvil */}
          <a
            href="/cuenta/perfil"
            className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <img
              alt="Profile Icon"
              src="https://utilities.farmatodo.com//arg.svg"
              className="w-6 h-5 object-cover rounded"
            />
            <span>Argentina</span>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-blue-500"></div>
          </a>

          {/* Búsqueda desktop */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-2xl hidden md:block"
          >
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar medicamentos, productos..."
                className="w-full text-sm px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Search className="w-3 h-3" />
              </button>
            </div>
          </form>

          {/* Acciones del usuario */}
          <div className="flex items-center gap-4">
            {/* Sucursal - Oculto en móvil */}
            <button
              onClick={onBranchClick}
              className="hidden lg:flex items-center gap-2 text-sm hover:text-blue-600 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Sucursal</div>
                <div className="font-medium text-sm">
                  {selectedBranch || 'Seleccionar'}
                </div>
              </div>
            </button>

            {/* Usuario - Oculto en móvil pequeño */}

            {/* Usuario - Oculto en móvil pequeño */}
            <div className="hidden sm:flex items-center gap-2 text-sm hover:text-blue-600 transition-colors">
  {user ? (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
      >
        <User className="w-5 h-5" />
        <span className="hidden lg:block">{user.full_name}</span>
         <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
      </div>
      {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-48 bg-white shadow-lg rounded-md py-1 z-50">
         
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Llamar a una función que navegue a perfil
                          onProfileClick?.(); // 👈 nueva prop
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Mi cuenta
                      </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLogout();
              setIsUserDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  ) : (
    <button
      onClick={onLoginClick}
      className="flex items-center gap-2"
    >
      <User className="w-5 h-5" />
      <span className="hidden lg:block">Ingresar</span>
    </button>
  )}
</div>

            {/* Carrito */}
            <button
              onClick={onCartClick}
              className="relative hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Búsqueda móvil */}
        <form onSubmit={handleSearch} className="mt-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Navbar de categorías desktop */}
      <nav className="hidden lg:block bg-gray-50 py-1 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex space-x-8">
            {categories.map(category => {
              const subcategories = getSubcategories(category.id);
              return (
                <li
                  key={category.id}
                  className="group relative"
                  onMouseEnter={() => setIsDropdownOpen(category.id)}
                  onMouseLeave={() => setIsDropdownOpen(null)}
                >
                  <button
                    onClick={() => onCategoryClick(category.slug)}
                    className="text-gray-700 hover:text-blue-600 text-xs font-medium flex items-center gap-1 py-2 transition-colors"
                  >
                    {category.name}
                    {subcategories.length > 0 && (
                      <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                    )}
                  </button>

                  {subcategories.length > 0 && isDropdownOpen === category.id && (
                    <div className="absolute left-0 top-full mt-1 w-96 bg-white shadow-xl rounded-md py-4 px-6 z-50">
                      <div className="grid gap-3">
                        {subcategories.map(sub => (
                          <div key={sub.id} className="category-container">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">
                              <a
                                href={`/categorias/${category.slug}/${sub.slug}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  onCategoryClick(sub.slug, category.slug);
                                }}
                                className="hover:text-blue-600 text-xs transition-colors block py-1"
                                style={{ color: '#63428F' }}
                              >
                                {sub.name}
                              </a>
                            </h3>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-[120px] bg-white z-40 overflow-y-auto"
          >
            <div className="p-4 border-b">
              {/* Sucursal móvil */}
              <button
                onClick={() => {
                  onBranchClick();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full py-3 hover:text-blue-600 transition-colors text-left"
              >
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-500">Sucursal</div>
                  <div className="font-medium">
                    {selectedBranch || 'Seleccionar sucursal'}
                  </div>
                </div>
              </button>

              {/* Usuario móvil */}

              <button
                onClick={() => {
                  if (user) {
                    onProfileClick?.(); // 👈 Ir al perfil si está logueado
                  } else {
                    onLoginClick(); // 👈 Ir al login si no lo está
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full py-3 hover:text-blue-600 transition-colors text-left"
              >
                <User className="w-5 h-5 flex-shrink-0" />
                <div>
                  {user ? (
                    <>
                      <div className="text-sm text-gray-500">Mi cuenta</div>
                      <div className="font-medium">{user.full_name}</div> {/* ✅ Nombre real */}
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-gray-500">Ingresar</div>
                      <div className="font-medium">Registro</div>
                    </>
                  )}
                </div>
              </button>

              {/* País móvil */}
              <a
                href="/cuenta/perfil"
                className="flex items-center gap-3 w-full py-3 hover:text-blue-600 transition-colors"
              >
                <img
                  alt="Argentina"
                  src="https://utilities.farmatodo.com//arg.svg"
                  className="w-6 h-5 object-cover rounded flex-shrink-0"
                />
                <span className="font-medium">Argentina</span>
              </a>
            </div>

            {/* Categorías móviles */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Categorías</h3>
              <div className="space-y-2">
                {categories.map(category => {
                  const subcategories = getSubcategories(category.id);
                  return (
                    <div key={category.id} className="border-b border-gray-100">
                      <button
                        onClick={() => {
                          if (subcategories.length > 0) {
                            setIsMobileCategoriesOpen(
                              isMobileCategoriesOpen === category.id ? null : category.id
                            );
                          } else {
                            handleMobileCategoryClick(category.slug);
                          }
                        }}
                        className="flex items-center justify-between w-full py-3 text-left hover:text-blue-600 transition-colors font-medium"
                      >
                        <span>{category.name}</span>
                        {subcategories.length > 0 && (
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${isMobileCategoriesOpen === category.id ? 'rotate-180' : ''
                              }`}
                          />
                        )}
                      </button>

                      {/* Subcategorías móviles */}
                      <AnimatePresence>
                        {subcategories.length > 0 && isMobileCategoriesOpen === category.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 pb-2"
                          >
                            <div className="space-y-2">
                              {subcategories.map(sub => (
                                <button
                                  key={sub.id}
                                  onClick={() => handleMobileSubcategoryClick(sub.slug, category.slug)}
                                  className="block w-full text-left py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                                  style={{ color: '#63428F' }}
                                >
                                  {sub.name}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para menú móvil */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}