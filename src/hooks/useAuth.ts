// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import mockData from '../data/data.json';

export type User = {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  preferred_branch_id?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Verificar que el usuario exista en mockData
        const isValidUser = mockData.users.some(u => u.id === parsedUser.id);
        if (isValidUser) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('user'); // Limpiar si es inválido
        }
      } catch (e) {
        console.error('Error al parsear usuario', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const user = mockData.users.find(
      u => u.email === email && u.password === password
    );
    
    if (user) {
      // Crear objeto de usuario SIN la contraseña
      const safeUser: User = {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        province: user.province,
        postal_code: user.postal_code,
        preferred_branch_id: user.preferred_branch_id,
      };

      
      
      localStorage.setItem('user', JSON.stringify(safeUser));
      setUser(safeUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, loading, login, logout };
}