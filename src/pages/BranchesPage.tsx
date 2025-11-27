import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import mockData from '../data/data.json';
import type { Branch, BranchHours } from '../types';

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('all');

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = () => {
    // Ordenar las sucursales por provincia y ciudad
    const sortedBranches = [...mockData.branches].sort((a, b) => {
      if (a.province < b.province) return -1;
      if (a.province > b.province) return 1;
      if (a.city < b.city) return -1;
      if (a.city > b.city) return 1;
      return 0;
    });
    
    setBranches(sortedBranches);
  };

  const provinces = Array.from(new Set(branches.map((b) => b.province)));

  const filteredBranches =
    selectedProvince === 'all'
      ? branches
      : branches.filter((b) => b.province === selectedProvince);

  const formatHours = (hours: BranchHours) => {
    if (!hours || Object.keys(hours).length === 0) {
      return 'Lunes a Sábados: 8:00 - 22:00';
    }
    
    // Traducir días al español
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
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Nuestras Sucursales</h1>
          <p className="text-blue-100 text-lg">
            Encontrá la farmacia más cercana a tu ubicación
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <label className="block font-semibold mb-2">Filtrar por provincia</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas las provincias</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{branch.name}</h3>
                {branch.is_open && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    Abierto
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <p>{branch.address}</p>
                    <p>
                      {branch.city}, {branch.province}
                    </p>
                    {branch.postal_code && <p>CP: {branch.postal_code}</p>}
                  </div>
                </div>

                {branch.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <a
                      href={`tel:${branch.phone}`}
                      className="text-sm text-gray-600 hover:text-blue-600"
                    >
                      {branch.phone}
                    </a>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    {formatHours(branch.hours as BranchHours)}
                  </p>
                </div>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm">
                Ver en el mapa
              </button>
            </div>
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron sucursales en esta provincia
            </p>
          </div>
        )}
      </div>
    </div>
  );
}