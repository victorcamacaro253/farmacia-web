import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import mockData from '../data/data.json';
import type { Branch } from '../types';

// Declaración global de Google Maps para TypeScript
declare global {
  interface Window {
    google: any;
  }
}

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function MapPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    loadBranches();
   
  }, []);

  useEffect(() => {
    if (branches.length > 0) {
      loadGoogleMaps();
    }
  }, [branches]);

  const loadBranches = () => {
    setBranches(mockData.branches);
  };

  const loadGoogleMaps = () => {
    // Verificar si Google Maps ya está cargado
    if (window.google) {
      initMap();
      return;
    }

    // Cargar Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
  };

  const initMap = () => {
    // Coordenadas por defecto (Buenos Aires)
    const defaultLocation = { lat: -34.6037, lng: -58.3816 };
    
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: defaultLocation,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        }
      ]
    });

    setMap(mapInstance);

    // Agregar marcadores para cada sucursal
    const newMarkers = branches.map(branch => {
      const marker = new window.google.maps.Marker({
        position: { lat: Number(branch.latitude), lng: Number(branch.longitude) },
        map: mapInstance,
        title: branch.name,
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#2563eb" stroke="white" stroke-width="2"/>
              <path d="M20 10C15.58 10 12 13.58 12 18C12 24 20 30 20 30C20 30 28 24 28 18C28 13.58 24.42 10 20 10Z" fill="white"/>
              <circle cx="20" cy="18" r="4" fill="#2563eb"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 40)
        }
      });

      marker.addListener('click', () => {
        setSelectedBranch(branch);
        mapInstance.panTo(marker.getPosition());
        mapInstance.setZoom(15);
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Obtener ubicación del usuario
    getUserLocation(mapInstance);
  };

  const getUserLocation = (mapInstance: any) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          setUserLocation(userPos);

          // Agregar marcador de ubicación del usuario
          new window.google.maps.Marker({
            position: userPos,
            map: mapInstance,
            title: 'Tu ubicación',
            icon: {
              url: 'data:image/svg+xml;base64,' + btoa(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" fill="#10b981" stroke="white" stroke-width="2"/>
                  <circle cx="16" cy="16" r="6" fill="white"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(32, 32),
              anchor: new window.google.maps.Point(16, 32)
            }
          });

          // Centrar mapa en ubicación del usuario
          mapInstance.setCenter(userPos);
        },
        (error) => {
          console.log('Error obteniendo ubicación:', error);
        }
      );
    }
  };

  const centerOnUser = () => {
    if (map && userLocation) {
      map.setCenter(userLocation);
      map.setZoom(15);
    }
  };

  const centerOnBranch = (branch: Branch) => {
    if (map) {
      map.setCenter({ lat: Number(branch.latitude), lng: Number(branch.longitude) });
      map.setZoom(15);
      setSelectedBranch(branch);
    }
  };

  const getDirections = (branch: Branch) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`;
    window.open(url, '_blank');
  };

  const formatHours = (hours: any) => {
    if (!hours || Object.keys(hours).length === 0) {
      return 'Lunes a Sábados: 8:00 - 22:00';
    }

    const daysMap: { [key: string]: string } = {
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo'
    };

    return Object.entries(hours)
      .map(([day, time]) => `${daysMap[day] || day}: ${time}`)
      .join(', ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Ubicación de Sucursales
          </h1>
          <p className="text-blue-100">
            Encontrá la farmacia más cercana a tu ubicación
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de sucursales */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 max-h-[80vh] overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Nuestras Sucursales</h2>
                
                {userLocation && (
                  <button
                    onClick={centerOnUser}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 mb-4"
                  >
                    <Navigation className="w-4 h-4" />
                    Centrar en mi ubicación
                  </button>
                )}

                <div className="space-y-4">
                  {branches.map((branch) => (
                    <div
                      key={branch.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedBranch?.id === branch.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => centerOnBranch(branch)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-800">{branch.name}</h3>
                        {branch.is_open && (
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                            Abierto
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p>{branch.address}</p>
                            <p>{branch.city}, {branch.province}</p>
                          </div>
                        </div>

                        {branch.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <a
                              href={`tel:${branch.phone}`}
                              className="hover:text-blue-600"
                            >
                              {branch.phone}
                            </a>
                          </div>
                        )}

                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="text-xs">{formatHours(branch.hours)}</p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          getDirections(branch);
                        }}
                        className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
                        Cómo llegar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div id="map" className="w-full h-[600px] rounded-lg" />
              
              {selectedBranch && (
                <div className="p-6 border-t">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {selectedBranch.name}
                      </h3>
                      <p className="text-gray-600">
                        {selectedBranch.address}, {selectedBranch.city}
                      </p>
                    </div>
                    {selectedBranch.is_open && (
                      <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded">
                        Abierto ahora
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Información</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Dirección:</strong> {selectedBranch.address}</p>
                        <p><strong>Ciudad:</strong> {selectedBranch.city}, {selectedBranch.province}</p>
                        {selectedBranch.postal_code && (
                          <p><strong>CP:</strong> {selectedBranch.postal_code}</p>
                        )}
                        {selectedBranch.phone && (
                          <p><strong>Teléfono:</strong> {selectedBranch.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Horarios</h4>
                      <p className="text-sm">{formatHours(selectedBranch.hours)}</p>
                      
                      <button
                        onClick={() => getDirections(selectedBranch)}
                        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
                        Abrir en Google Maps
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}