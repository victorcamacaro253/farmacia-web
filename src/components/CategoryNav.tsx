import { useState, useRef, useEffect } from 'react';
import { 
  Pill, Heart, Baby, Sparkles, Home, Stethoscope, Leaf, 
  ChevronDown, Activity, Shield, Wind,  Scissors, 
  User, Cloud, Utensils, Droplet, Palette, 
  Eye, Hand, Shirt, Flower, Dumbbell, Sun, 
  Droplets, Sprout
} from 'lucide-react';
import type { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
   allCategories: Category[]; 
  onCategoryClick: (slug: string) => void;
  onSubcategoryClick?: (slug: string) => void;
}

// Mapa de iconos para todas las categorías y subcategorías
const iconMap: Record<string, React.ReactNode> = {
  // Categorías principales
  Pill: <Pill className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
  Baby: <Baby className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Home: <Home className="w-4 h-4" />,
  Stethoscope: <Stethoscope className="w-4 h-4" />,
  Leaf: <Leaf className="w-4 h-4" />,
  
  // Subcategorías de Medicamentos
  Activity: <Activity className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  Wind: <Wind className="w-4 h-4" />,
  
  // Subcategorías de Cuidado Personal
  Tooth: <Wind className="w-4 h-4" />,
  Scissors: <Scissors className="w-4 h-4" />,
  User: <User className="w-4 h-4" />,
  Cloud: <Cloud className="w-4 h-4" />,
  
  // Subcategorías de Bebés
  Utensils: <Utensils className="w-4 h-4" />,
  Droplet: <Droplet className="w-4 h-4" />,
  
  // Subcategorías de Belleza
  Palette: <Palette className="w-4 h-4" />,
  Lipstick: <Wind className="w-4 h-4" />,
  Eye: <Eye className="w-4 h-4" />,
  Hand: <Hand className="w-4 h-4" />,
  
  // Subcategorías de Hogar
  Shirt: <Shirt className="w-4 h-4" />,
  Flower: <Flower className="w-4 h-4" />,
  
  // Subcategorías de Salud y Bienestar
  Capsule: <Wind className="w-4 h-4" />,
  Dumbbell: <Dumbbell className="w-4 h-4" />,
  
  // Subcategorías de Dermocosmética
  Face: <Wind className="w-4 h-4" />,
  Sun: <Sun className="w-4 h-4" />,
  Droplets: <Droplets className="w-4 h-4" />,
  Sprout: <Sprout className="w-4 h-4" />,
};

export default function CategoryNav({ 
  categories, 
    allCategories,
  onCategoryClick, 
  onSubcategoryClick 
}: CategoryNavProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<'left' | 'center' | 'right'>('center');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const navRef = useRef<HTMLDivElement>(null);

  // Filtrar solo categorías principales (sin parent_id)
  const mainCategories = categories.filter(cat => !cat.parent_id);

  // Obtener subcategorías de una categoría principal
 const getSubcategories = (categoryId: string) => {
    return allCategories.filter(cat => cat.parent_id === categoryId); // ← Usa allCategories
  };
  const handleMouseEnter = (categoryId: string, element: HTMLButtonElement) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Calcular posición del dropdown
    if (navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const buttonRect = element.getBoundingClientRect();
      const buttonCenter = buttonRect.left + buttonRect.width / 2;
      const navCenter = navRect.left + navRect.width / 2;
      
      if (buttonCenter < navCenter - 100) {
        setDropdownPosition('left');
      } else if (buttonCenter > navCenter + 100) {
        setDropdownPosition('right');
      } else {
        setDropdownPosition('center');
      }
    }
    
    setActiveCategory(categoryId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 150);
  };

  const handleSubcategoryClick = (subcategorySlug: string) => {
    if (onSubcategoryClick) {
      onSubcategoryClick(subcategorySlug);
    }
    setActiveCategory(null);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav 
      ref={navRef}
      className="bg-white border-b relative z-30"
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto py-4 scrollbar-hide">
          {mainCategories.map((category) => {
            const subcategories = getSubcategories(category.id);
            const hasSubcategories = subcategories.length > 0;
            
            return (
              <div key={category.id} className="relative">
                <button
                  onMouseEnter={(e) => handleMouseEnter(category.id, e.currentTarget)}
                  onClick={() => onCategoryClick(category.slug)}
                  className="flex flex-col items-center gap-2 min-w-fit group relative"
                >
                  <div className={`bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-colors ${
                    activeCategory === category.id ? 'bg-blue-100' : ''
                  }`}>
                    {iconMap[category.icon] || <Pill className="w-5 h-5" />}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 whitespace-nowrap">
                      {category.name}
                    </span>
                    {hasSubcategories && (
                      <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${
                        activeCategory === category.id ? 'rotate-180' : ''
                      }`} />
                    )}
                  </div>
                </button>

                {/* Dropdown de Subcategorías */}
                {activeCategory === category.id && hasSubcategories && (
                  <div 
                    className={`absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-xl z-50 min-w-64 py-2 ${
                      dropdownPosition === 'left' ? 'left-0' :
                      dropdownPosition === 'right' ? 'right-0' :
                      'left-1/2 transform -translate-x-1/2'
                    }`}
                    onMouseEnter={() => {
                      if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                      }
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="px-4 py-2 border-b">
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-xs mt-1">
                        {category.description}
                      </p>
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto">
                      {subcategories.map((subcategory) => (
                        <button
                          key={subcategory.id}
                          onClick={() => handleSubcategoryClick(subcategory.slug)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <div className="bg-blue-50 p-2 rounded-full">
                            {iconMap[subcategory.icon] || <Pill className="w-3 h-3" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 text-sm">
                              {subcategory.name}
                            </p>
                            <p className="text-gray-600 text-xs mt-1 truncate">
                              {subcategory.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Ver todas las opciones */}
                    <div className="px-4 py-3 border-t bg-gray-50">
                      <button
                        onClick={() => onCategoryClick(category.slug)}
                        className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Ver todos los productos ›
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlay para mobile (opcional) */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          activeCategory ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setActiveCategory(null)}
      />
    </nav>
  );
}