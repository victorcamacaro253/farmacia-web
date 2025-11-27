import { useState, useEffect } from 'react';
import { Filter, ChevronDown, Grid3X3, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import mockData from '../data/data.json';
import type { Product, Category } from '../types';

interface CategoryPageProps {
  categorySlug: string;
    subcategorySlug?: string;
  onProductClick: (slug: string) => void;
  onAddToCart: (product: Product) => void;
  onSubcategoryClick?: (slug: string) => void;
}

export default function CategoryPage({
  categorySlug,
  onProductClick,
   subcategorySlug,
  onAddToCart,
  onSubcategoryClick,
}: CategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Solo para inicializar desde la URL
useEffect(() => {
  setSelectedSubcategory(subcategorySlug || null);
}, [subcategorySlug]);

// Para recargar datos cuando algo cambie
useEffect(() => {
  loadCategoryData();
}, [categorySlug, selectedSubcategory, sortBy]);

  const loadCategoryData = () => {
    // Buscar la categoría principal por slug
    const categoryData = mockData.categories.find(cat => 
      cat.slug === categorySlug && !cat.parent_id
    );

    if (categoryData) {
      setCategory(categoryData);

      // Buscar subcategorías de esta categoría
      const categorySubcategories = mockData.categories.filter(
        cat => cat.parent_id === categoryData.id
      );
      setSubcategories(categorySubcategories);

       let selectedSubcategoryId: string | null = null;
  if (selectedSubcategory) {
    const matchedSub = categorySubcategories.find(sub => sub.slug === selectedSubcategory);
    selectedSubcategoryId = matchedSub?.id || null;
  }

      // Filtrar productos por categoría y subcategoría
      let filteredProducts = mockData.products.filter(product => {
        const categoryMatch = product.category_id === categoryData.id;
        const subcategoryMatch = !selectedSubcategoryId || 
          product.subcategory_id === selectedSubcategoryId;
        return categoryMatch && subcategoryMatch;
      });

      // Aplicar ordenamiento
      filteredProducts = filteredProducts.sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name':
            return a.name.localeCompare(b.name);
          case 'brand':
            return a.brand.localeCompare(b.brand);
          default: // featured
            return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0) ||
                   (b.is_on_sale ? 1 : 0) - (a.is_on_sale ? 1 : 0);
        }
      });

      setProducts(filteredProducts);

      // Extraer marcas únicas de los productos filtrados
      const uniqueBrands = Array.from(
        new Set(filteredProducts.map((p) => p.brand).filter(Boolean))
      ) as string[];
      setBrands(uniqueBrands);
    }
  };

  const handleSubcategoryClick = (subcategorySlug: string) => {
    if (selectedSubcategory === subcategorySlug) {
      // Si ya está seleccionada, deseleccionar
      setSelectedSubcategory(null);
    } else {
      setSelectedSubcategory(subcategorySlug);
    }
    
    if (onSubcategoryClick) {
      onSubcategoryClick(subcategorySlug);
    }
  };

  const clearFilters = () => {
    setSelectedSubcategory(null);
    setSelectedBrands([]);
    setPriceRange([0, 50000]);
    setSortBy('featured');
  };

  const filteredProducts = products.filter((product) => {
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return priceMatch && brandMatch;
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const getSubcategoryName = (subcategoryId: string) => {
    return subcategories.find(sub => sub.id === subcategoryId)?.name || 'General';
  };

  const getSubcategoryNameBySlug = (slug: string) => {
  return subcategories.find(sub => sub.slug === slug)?.name || 'General';
};

  const hasActiveFilters = selectedSubcategory || selectedBrands.length > 0 || priceRange[1] < 50000;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {category?.name || 'Categoría'}
              </h1>
              <p className="text-blue-100">{category?.description}</p>
            </div>
            
            {/* Contador de productos y modo de vista */}
            <div className="flex items-center gap-4">
              <span className="text-blue-200">
                {filteredProducts.length} productos
              </span>
              <div className="flex bg-white/20 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white text-blue-600' : 'text-white'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white text-blue-600' : 'text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb y Filtros activos */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Inicio</span>
            <span>›</span>
            <span className="font-medium">{category?.name}</span>
            {selectedSubcategory && (
              <>
                <span>›</span>
                <span className="font-medium">
                  {getSubcategoryNameBySlug(selectedSubcategory)}
                </span>
              </>
            )}
          </div>

          {/* Filtros activos */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filtros activos:</span>
              {selectedSubcategory && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                   {getSubcategoryNameBySlug(selectedSubcategory)}
                  <button
                    onClick={() => setSelectedSubcategory(null)}
                    className="ml-1 hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedBrands.map(brand => (
                <span key={brand} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {brand}
                  <button
                    onClick={() => toggleBrand(brand)}
                    className="ml-1 hover:text-green-600"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 ml-2"
              >
                Limpiar todo
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center justify-between w-full mb-4"
              >
                <span className="font-bold text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtros
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    showFilters ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
                <h3 className="font-bold text-lg mb-6 hidden lg:block">
                  Filtros
                </h3>

                {/* Subcategorías */}
                {subcategories.length > 0 && (
                  <div className="mb-6">
                    <label className="block font-semibold mb-3">Subcategorías</label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedSubcategory(null)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          !selectedSubcategory 
                            ? 'bg-blue-100 text-blue-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Todas las subcategorías
                      </button>
                      {subcategories.map((subcategory) => (
                        <button
                          key={subcategory.id}
                          onClick={() => handleSubcategoryClick(subcategory.slug)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedSubcategory === subcategory.slug
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {subcategory.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block font-semibold mb-2">Ordenar por</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="featured">Destacados</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                    <option value="name">Nombre A-Z</option>
                    <option value="brand">Marca A-Z</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block font-semibold mb-2">
                    Rango de Precio
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0].toLocaleString('es-AR')}</span>
                      <span>${priceRange[1].toLocaleString('es-AR')}</span>
                    </div>
                  </div>
                </div>

                {brands.length > 0 && (
                  <div>
                    <label className="block font-semibold mb-2">Marcas</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {brands.map((brand) => (
                        <label
                          key={brand}
                          className="flex items-center gap-3 cursor-pointer py-1"
                        >
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {/* Header de resultados */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="text-gray-600">
                <span className="font-semibold">{filteredProducts.length}</span> productos encontrados
                {selectedSubcategory && (
                  <span className="text-blue-600 ml-2">
                    en {getSubcategoryNameBySlug(selectedSubcategory)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500">Vista:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid de productos */}
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                  viewMode={viewMode}
                  showSubcategory={true}
                  subcategoryName={getSubcategoryName(product.subcategory_id || '')}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
                  <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {hasActiveFilters 
                      ? "Intenta ajustar los filtros para ver más resultados."
                      : "No hay productos disponibles en esta categoría."
                    }
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}