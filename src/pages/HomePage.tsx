import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Phone,
  Star,
  Truck,
  Shield,
  Heart,
  Play,
  Pause,
  ChevronRightIcon
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import mockData from '../data/data.json';
import type { Product, Branch, BranchHours } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import BrandCard from '../components/BrandCard';
import HorizontalOfferCarousel from '../components/HorizontalOfferCarousel';
import DoubleBanner from '../components/DoubleBanner';
import { useCart } from '../context/CartContext';


interface HomePageProps {
  onProductClick: (slug: string) => void;
  onAddToCart: (product: Product) => void;
  onBranchClick: () => void;
  onCategoryClick?: (slug: string) => void;
}

// ✅ Extract CategoryCard for cleaner JSX
const CategoryCard = ({ 
  slug, 
  name, 
  icon, 
  color,
  onClick 
}: {
  slug: string;
  name: string;
  icon: string;
  color: string;
  onClick: () => void;
}) => (
  <Link
    to={`/categorias/${slug}`}
    className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all duration-300 group hover:shadow-md border border-transparent hover:border-blue-200 min-w-0"
    aria-label={`Explorar categoría ${name}`}
  >
    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${color} flex items-center justify-center text-lg sm:text-xl mb-2 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <span className="font-medium text-gray-700 text-center group-hover:text-blue-600 text-xs sm:text-sm md:text-base leading-tight sm:leading-normal">
      {name}
    </span>
  </Link>
);

// ✅ Extract BranchCard
const BranchCard = ({ branch }: { branch: Branch }) => {
  const formatHours = useCallback((hours: BranchHours) => {
    if (!hours || Object.keys(hours).length === 0) {
      return 'Lun–Sáb: 8:00–22:00';
    }
    const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase();
    const keyMap: Record<string, keyof BranchHours> = {
      domingo: 'sunday',
      lunes: 'monday',
      martes: 'tuesday',
      miércoles: 'wednesday',
      jueves: 'thursday',
      viernes: 'friday',
      sábado: 'saturday'
    };
    const todayKey = keyMap[today] || 'monday';
    return hours[todayKey] || 'Lun–Sáb: 8:00–22:00';
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow border border-blue-50 h-full">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg leading-tight">{branch.name}</h3>
        {branch.is_open ? (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 flex-shrink-0 ml-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Abierto
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ml-2">
            Cerrado
          </span>
        )}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-gray-600 text-xs sm:text-sm">
            <p className="font-medium leading-tight">{branch.address}</p>
            <p className="leading-tight">{branch.city}, {branch.province}</p>
          </div>
        </div>

        {branch.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <a
              href={`tel:${branch.phone.replace(/-/g, '')}`}
              className="text-gray-600 hover:text-blue-600 font-medium text-xs sm:text-sm"
            >
              {branch.phone}
            </a>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <p className="text-gray-600 font-medium text-xs sm:text-sm">
            {formatHours(branch.hours)}
          </p>
        </div>
      </div>

      <Link 
        to="/mapa"
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium block text-center"
        aria-label={`Ver ${branch.name} en el mapa`}
      >
        Ver en mapa
      </Link>
    </div>
  );
};

// ✅ Banner Card Component
const BannerCard = ({ 
  image, 
  title, 
  subtitle, 
  buttonText, 
  category, 
  onClick,
  mobileImage 
}: {
  image: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  category: string;
  onClick: (category: string) => void;
  mobileImage?: string;
}) => (
  <div className="w-full h-full relative rounded-lg overflow-hidden group">
    <picture>
      {mobileImage && (
        <source 
          media="(max-width: 768px)" 
          srcSet={mobileImage}
        />
      )}
      <img
        src={image}
        alt={title || `Banner ${category}`}
        className="w-full h-full object-fit transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </picture>
    
    {(title || subtitle || buttonText) && (
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
        <div className="p-3 sm:p-4 w-full">
          {title && (
            <h3 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">{title}</h3>
          )}
          {subtitle && (
            <p className="text-white/90 text-xs sm:text-sm mb-2 sm:mb-3">{subtitle}</p>
          )}
          {buttonText && (
            <button
              onClick={() => onClick(category)}
              className="bg-white text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm hover:bg-gray-100 transition-colors"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    )}
  </div>
);

// ✅ Slider Component for Center Column
const BannerSlider = ({ 
  banners, 
  onBannerClick 
}: {
  banners: Array<{
    image: string;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    category: string;
    mobileImage?: string;
  }>;
  onBannerClick: (category: string) => void;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [banners.length, isPlaying]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {/* Slider Track */}
      <div className="relative w-full h-full overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <BannerCard {...banner} onClick={onBannerClick} />
            </div>
          ))}
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-1 sm:gap-2">
        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white/90 hover:bg-white rounded-lg p-1.5 sm:p-2 transition-colors border border-gray-200"
          aria-label={isPlaying ? "Pausar carrusel" : "Reproducir carrusel"}
        >
          {isPlaying ? (
            <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
          ) : (
            <Play className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
          )}
        </button>

        {/* Arrow Buttons */}
        <button
          onClick={prevSlide}
          className="bg-white/90 hover:bg-white rounded-lg p-1.5 sm:p-2 transition-colors border border-gray-200"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white/90 hover:bg-white rounded-lg p-1.5 sm:p-2 transition-colors border border-gray-200"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [nearbyBranches, setNearbyBranches] = useState<Branch[]>([]);

  // Banner data for the 3-column layout
  const leftBanners = useMemo(() => [
    { 
      image: 'https://farmacityar.vtexassets.com/assets/vtex.file-manager-graphql/images/ef43ff06-3956-4e13-8b8f-cbf23ee5b429___d98bc614ad6ef79c61859e9e09f9934c.webp',
      mobileImage: 'https://farmacityar.vtexassets.com/assets/vtex.file-manager-graphql/images/ac5d66a2-cf56-4b17-86a6-937fa0fbc6ae___8a5e2867706139f8effa0ca3c004c079.webp',
      title: 'Especial Solares Primavera',
      subtitle: 'hasta 40% off',
      buttonText: 'Ver más',
      category: 'dermocosmetica'
    },
    { 
      image: 'https://cdn.newtail.com.br/retail_media/ads/2025/11/11/e78b1beb2a0e08301fdddb5a531bab54.raw.webp',
      mobileImage: 'https://farmacityar.vtexassets.com/assets/vtex.file-manager-graphql/images/54c1f321-dd4c-4930-a073-468cf56a9acc___f106bf7963fe20bfddd1366ca4e1baae.webp',
      title: 'Especial Solares Primavera',
      subtitle: 'hasta 40% off',
      buttonText: 'Ver más',
      category: 'dermocosmetica'
    }
  ], []);

  const centerBanners = useMemo(() => [
    { 
      image: 'https://farmacityar.vtexassets.com/assets/vtex.file-manager-graphql/images/b06b9cce-628d-4bcb-9006-3ddc34be166b___bba2b6e80f8a79dedb17e6a6282a0d32.webp',
      mobileImage: 'https://farmacityar.vtexassets.com/assets/vtex.file-manager-graphql/images/ae03e600-a017-4950-a16c-8e66ff5e47da___9be28e1e74b4069a076cba7848521aad.webp',
      title: 'Si querés potenciarte',
      subtitle: 'hay ofertas hasta 2x1',
      buttonText: 'Ver más',
      category: 'ofertas'
    },
    { 
      image: 'https://farmacityar.vtexassets.com/assets/vtex.file-manager-graphql/images/2bc4f7cb-154c-45f6-96eb-5ea52e8bbb7e___d6380cd2b09a38ca4d8b47cf717cf6e4.webp',
      mobileImage: 'https://farmacityar.vtexassets.com/assets/vtex.file-manager-graphql/images/70afe089-9f21-443f-a2ac-af5e2f129ab0___90401a0bf299f899eef0690e65ebd03a.webp',
      title: 'Especial máscaras de pestañas',
      subtitle: 'hasta 40% off',
      buttonText: 'Ver más',
      category: 'belleza'
    },
    { 
      image: 'https://farmacityar.vtexassets.com/assets/vtex.file-manager-graphql/images/54c1f321-dd4c-4930-a073-468cf56a9acc___f106bf7963fe20bfddd1366ca4e1baae.webp',
      mobileImage: 'https://farmacityar.vtexassets.com/assets/vtex.file-manager-graphql/images/5ff37fef-cac4-4d7e-8846-6e0c48b283ca___15a510c1a9e32273e112e09da1f4659c.webp',
      title: 'Marcas que te acompañan',
      subtitle: 'hasta 2x + cupón',
      buttonText: 'Ver más',
      category: 'nuestras-marcas'
    }
  ], []);

  const rightBanners = useMemo(() => [
    { 
      image: 'https://cdn.newtail.com.br/retail_media/ads/2025/11/13/b83aed364907667781b58d3407fb46c4.raw.webp',
      title: 'Ofertas Especiales',
      buttonText: 'Descubrir',
      category: 'ofertas'
    },
    { 
      image: 'https://farmacityar.vtexassets.com/assets/vtex.file-manager-graphql/images/c6a2ff50-60d9-443d-a47e-c5049db1311f___6df151b929578c1aaf70d5f7beca9a70.webp',
      mobileImage: 'https://farmacityar.vtexassets.com/assets/vtex.file-manager-graphql/images/adc2cd47-52af-4b02-a4b6-79265472498d___5ff20b4cfede81ee19b84d37c4201948.webp',
      title: 'Extreme Week',
      subtitle: 'hasta 2x1',
      buttonText: 'Ver más',
      category: 'ofertas'
    }
  ], []);

  const categories = useMemo(() => [
    { slug: 'medicamentos', name: 'Medicamentos', icon: '💊', color: 'bg-blue-500' },
    { slug: 'cuidado-personal', name: 'Cuidado Personal', icon: '🧴', color: 'bg-green-500' },
    { slug: 'bebes', name: 'Bebés', icon: '👶', color: 'bg-pink-500' },
    { slug: 'belleza', name: 'Belleza', icon: '💄', color: 'bg-purple-500' },
    { slug: 'dermocosmetica', name: 'Dermocosmética', icon: '🌿', color: 'bg-emerald-500' },
    { slug: 'salud-bienestar', name: 'Salud', icon: '❤️', color: 'bg-red-500' }
  ], []);

  const brands = useMemo(() => [
    { name: "Marca Farmatodo", logo: "https://lh3.googleusercontent.com/WNN1Vy_355mgP1gG2_aXfy2g8rmh9P5kPtxx6rDojbAEpndLmlUlQWoRIJdjXIj222EkzXqt75Cg8O846Y5G39IVu8EfcQmV_hdF4vHf-62MBvE=s150-rw-tr=w-150,q-70" },
    { name: "Herbaplant", logo: "https://lh3.googleusercontent.com/P2e8kAtvhdCPZmLsEIA5jqU6BMVvYNXpx9kKBBz02eWzRGOAF8qloXzmivNXRCNp6lSO-12kGzL20CaRBAc9-hY_fLIK9fRP003qIF1Cdue-5To9=s150-rw-tr=w-150,q-70" },
    { name: "Suavinex", logo: "https://lh3.googleusercontent.com/mMqIf7MU6JHFDY4_7j4ItbNDnydHfr2K7GsOrZqLdX41FHzPvqDC-S16kUoaiVFyedsfn9VV4KlE7nhBS7nOsg_g7hKWC_UZkHt3UoG6g3i2ijKM=s150-rw-tr=w-150,q-70" },
    { name: "Oreo", logo: "https://lh3.googleusercontent.com/u8MlwgSHJKMmztN-PmH6SjEmkar15GUUzZjVOc2LnTMMGFBFW6ihOxgwi3jsotpWIZ9k5oajttItG7ZG3l04HP63fW4BtsiR-hPoMPaPBob_uDJt=s150-rw-tr=w-150,q-70" },
    { name: "Ronava", logo: "https://lh3.googleusercontent.com/s1_VTANmJPl8QVAe2FmBMDMCUVwRDiMqioyJDmiESRe9_PYZQIDd0ZQ67M2hk69oFV4mN60i7Fymg0Pad_VvQtmexKc-T7z4L7mGaor0Ikvu4uHv=s150-rw-tr=w-150,q-70" },
    { name: "Mimlot", logo: "https://lh3.googleusercontent.com/TcBTG220ycXJYDS5S3inJzYUCRfI1Z4cSK9nfsSGEl7IEco_OvDw7fv1YVewPimukSp7jKxCiUCzPllEkj9nVyGISAjmzpUjtUexCQJW3JuObNR5=s150-rw-tr=w-150,q-70" },
    { name: "Arco Iris", logo: "https://lh3.googleusercontent.com/35-Rb4p1iujmUnZBA6zg0K70AjhrNlTvBdXZrzR8PGHUsh3ruzTjtW1hYZ5XL_7ajcYK6Y37lnBO4KF8NJ3s7oZ87v5EbX-NUx2yUjuu78OTE5_0=s150-rw-tr=w-150,q-70" },
    { name: "Brucen", logo: "https://lh3.googleusercontent.com/rSCtozWnIUyZUwlHKR9-kbmm0rVyLaVvr43VgZeYc3MWF4sWhRBjWyvoI5vkCY5FiBzM8HXfAx1dtm59GZtD9sTItJrAwfwDh0HtQkLRKBhuruE=s150-rw-tr=w-150,q-70" },
    { name: "Garnier", logo: "https://lh3.googleusercontent.com/5Cife2_F5d2DSx4y8BznuTw3PLqW3oNuMKt_mJUoKXyGGDJpenvVh6aM1sED5XWp9qxSWCuiiCqhWB0lRgkBj7aBWqjpcfhcJG299fNN5kj89xoUMg=s150-rw-tr=w-150,q-70" },
    { name: "Heinz", logo: "https://lh3.googleusercontent.com/pbHAmQn_po0H19pJZd99oKrDU29EvGCpQOZzDw1D_zB5eUASd0M6dV2lC3BbVbWZaQG5mCPFzm6CkJX5fxjKCX7Eqn65XMAiRTK2LXL6H6hZX-o=s150-rw-tr=w-150,q-70" },
    { name: "Bioderma", logo: "https://lh3.googleusercontent.com/ndBjv6LeyVt_iL9ABevBiKFBMg-f9eC0EeKB5YaB_wFhsV_ACYjiwLj8NM9ziBls-TqfpKE2DMb_1qdXVNMlChnt8HZ4NBJW_8seNBSR6IyN0YnX=s150-rw-tr=w-150,q-70" },
    { name: "Rolda", logo: "https://lh3.googleusercontent.com/shTKTbmQQWfHfbH3ifAuJqdIfixcSEi5kX89-ljUhMF-Q8VMA9KtDTQahmiRmkUrgfzZIPUe1iuM2RqDh8--O77Cq4RYI1C_Av7kaB7NhxRcGgLa=s150-rw-tr=w-150,q-70" },
  ], []);

  const loadData = useCallback(() => {
    const featured = mockData.products.filter(p => p.is_featured).slice(0, 8);
    const sale = mockData.products.filter(p => p.is_on_sale).slice(0, 8);
    const trending = [...mockData.products]
      .sort((a, b) => {
        let scoreA = (a.is_featured ? 10 : 0) + (a.is_on_sale ? 5 : 0) + (a.stock > 100 ? 3 : 0);
        let scoreB = (b.is_featured ? 10 : 0) + (b.is_on_sale ? 5 : 0) + (b.stock > 100 ? 3 : 0);
        return scoreB - scoreA;
      })
      .slice(0, 6);
    const branches = mockData.branches.filter(b => b.is_open).slice(0, 3);

    setFeaturedProducts(featured);
    setSaleProducts(sale);
    setTrendingProducts(trending);
    setNearbyBranches(branches);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleBannerClick = useCallback((categorySlug: string) => {
    navigate(`/categorias/${categorySlug}`);
  }, [navigate]);

  const handleBranchClick = () => {
    navigate('/sucursales');
  };

  const handleProductClick = (slug: string) => {
    navigate(`/producto/${slug}`);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner - Responsive Layout */}
      <section className="w-full py-4 sm:py-5 relative z-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 h-[300px] sm:h-[350px] md:h-[400px]">
            {/* Left Column - Hidden on mobile, visible on lg+ */}
            <div className="hidden lg:block lg:w-1/3 h-full">
              <div className="h-full flex flex-col gap-3 sm:gap-4">
                {leftBanners.map((banner, index) => (
                  <div key={index} className="h-1/2">
                    <BannerCard {...banner} onClick={handleBannerClick} />
                  </div>
                ))}
              </div>
            </div>

            {/* Center Column - Full width on mobile, 3/5 on desktop */}
            <div className="w-full lg:w-3/5 h-full">
              <BannerSlider banners={centerBanners} onBannerClick={handleBannerClick} />
            </div>

            {/* Right Column - Hidden on mobile, visible on lg+ */}
            <div className="hidden lg:block lg:w-1/3 h-full">
              <div className="h-full flex flex-col gap-3 sm:gap-4">
                {rightBanners.map((banner, index) => (
                  <div key={index} className="h-1/2">
                    <BannerCard {...banner} onClick={handleBannerClick} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 sm:py-8 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            Explorar Categorías
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} {...cat} />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-10">
        {/* Featured Products */}
        <section className="mb-10 px-10 sm:mb-12 md:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-current" />
                Productos Destacados
              </h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Los más vendidos y mejor valorados por nuestros clientes</p>
            </div>
             <Link
              to="/categorias/destacados"
              className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm flex items-center gap-1 self-start sm:self-auto"
            >
              Ver todos
              <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>

          {/* Responsive product grid */}
          <div className="sm:px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>

           {/* Double Banner Newtail */}
      <DoubleBanner
        leftBanner={{
          image: 'https://cdn.newtail.com.br/retail_media/ads/2025/11/04/6e9981ffd7360e0f98d1cb8cc97cbc6d.raw.webp',
          link: 'https://www.farmacity.com/2386?map=productClusterIds',
          alt: 'Ofertas por cluster'
        }}
        rightBanner={{
          image: 'https://cdn.newtail.com.br/retail_media/ads/2025/09/29/9b353bc302698e85f02be9f6e22542d1.raw.webp',
          link: 'https://www.farmacity.com/extreme',
          alt: 'Extreme Week'
        }}
      />

        {/* Sale Products */}
        {saleProducts.length > 0 && (
          <section className="mb-10 sm:mb-12 md:mb-14">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 sm:-bottom-16 sm:-left-16 w-24 h-24 sm:w-48 sm:h-48 bg-white/10 rounded-full"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Ofertas Especiales</h2>
                    <p className="text-white/90 mt-1 text-sm sm:text-base">Aprovechá los mejores descuentos</p>
                  </div>
                  <div className="bg-white/20 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full self-start sm:self-auto">
                    <span className="text-white font-bold text-xs sm:text-sm md:text-base">HASTA 50% OFF</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {saleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onProductClick={handleProductClick}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

      

        {/* Benefits */}
        <section className="mb-10 sm:mb-12 md:mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { icon: Truck, title: "Envío Gratis", desc: "En compras mayores a $15.000", color: "text-blue-600" },
              { icon: Shield, title: "Compra Segura", desc: "Protección garantizada", color: "text-green-600" },
              { icon: Clock, title: "Entrega Rápida", desc: "24-48hs en CABA", color: "text-orange-600" }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4 sm:p-5 text-center shadow-sm">
                <item.icon className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3 ${item.color}`} />
                <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        
        <HorizontalOfferCarousel
          products={saleProducts}
          onProductClick={handleProductClick}
          title="Ofertas Relámpago"
        />

        

        {/* Marcas Destacadas */}
        <section className="py-6 sm:py-8 md:py-12 bg-white mb-10 sm:mb-12 md:mb-14">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
              Marcas que confían en nosotros
            </h2>
            <div 
              className="flex overflow-x-auto gap-4 sm:gap-6 py-2 hide-scrollbar px-2"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {brands.map((brand, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-20 sm:w-24 md:w-28 snap-start"
                >
                  <BrandCard name={brand.name} logo={brand.logo} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Branches */}
        <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Sucursales Cercanas</h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Encontrá tu farmacia más cercana</p>
            </div>
            <button
              onClick={handleBranchClick}
              className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 text-xs sm:text-sm md:text-base self-start sm:self-auto"
            >
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              Ver todas
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {nearbyBranches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>
        </section>
      </div>

      {/* Custom CSS for hide-scrollbar */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}