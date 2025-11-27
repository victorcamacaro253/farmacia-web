// pages/AboutPage.tsx
import { MapPin, Clock, Truck, Shield, Star } from 'lucide-react';

interface AboutPageProps {
  onBranchClick?: () => void;
}

export default function AboutPage({ onBranchClick }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Cuidamos tu salud con productos de calidad, atención personalizada y compromiso con tu bienestar.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            Nuestra Historia
          </h2>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <p className="text-gray-600 text-base leading-relaxed">
                FarmaSalud nació en 2010 con un propósito claro: brindar acceso fácil, seguro y confiable a productos farmacéuticos y de cuidado personal en Argentina.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mt-4">
                Desde entonces, hemos crecido hasta convertirnos en una red de más de 100 sucursales en todo el país, siempre manteniendo nuestro compromiso con la atención personalizada, la calidad de los productos y el asesoramiento profesional.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mt-4">
                No somos solo una farmacia: somos tu aliado en el cuidado diario de tu salud y la de tu familia.
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Nuestra Misión y Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Calidad y Seguridad</h3>
              <p className="text-gray-600">
                Trabajamos únicamente con proveedores certificados y garantizamos la trazabilidad de todos nuestros productos.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Compromiso con el Cliente</h3>
              <p className="text-gray-600">
                Escuchamos, asesoramos y acompañamos a cada cliente con empatía y profesionalismo.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Accesibilidad</h3>
              <p className="text-gray-600">
                Llevamos salud a tu hogar con entregas rápidas y envíos gratuitos en compras mayores a $15.000.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Disponibilidad</h3>
              <p className="text-gray-600">
                Más de 15.000 productos siempre en stock, con atención presencial y digital todos los días.
              </p>
            </div>
          </div>
        </section>

        {/* Locations CTA */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Visitá una de nuestras sucursales
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Contamos con más de 100 puntos de venta en todo el país, con farmacéuticos profesionales listos para ayudarte.
          </p>
          <button
            onClick={onBranchClick}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            Ver Sucursales
          </button>
        </section>
      </div>
    </div>
  );
}