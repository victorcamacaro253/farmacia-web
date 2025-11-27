import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  onMapClick?: () => void;
  onAboutClick?: () => void;
}

export default function Footer({ onMapClick,onAboutClick }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
                F+
              </div>
              <span className="text-xl font-bold text-white">FarmaSalud</span>
            </div>
            <p className="text-sm mb-4">
              Tu farmacia de confianza en Argentina. Cuidamos tu salud y bienestar.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={onAboutClick} // si lo pasas como prop
                  className="hover:text-blue-400 transition-colors"
                >
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={onMapClick}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Mapa de Sucursales
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Trabaja con Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Atención al Cliente</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Envíos y Entregas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Cambios y Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Métodos de Pago
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Av. Corrientes 1234, Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>0800-555-FARMA (32762)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>contacto@farmasalud.com.ar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© 2024 FarmaSalud Argentina. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs text-gray-400">
            Los precios publicados en esta página incluyen IVA. Las imágenes son ilustrativas.
          </p>
        </div>
      </div>
    </footer>
  );
}
