// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const isValidUser = mockData.users.some(u => u.id === parsedUser.id);
        if (isValidUser) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('user');
        }
      } catch (e) {
        console.error('Error al parsear usuario', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const foundUser = mockData.users.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const safeUser: User = {
        id: foundUser.id,
        email: foundUser.email,
        full_name: foundUser.full_name,
        phone: foundUser.phone,
        address: foundUser.address,
        city: foundUser.city,
        province: foundUser.province,
        postal_code: foundUser.postal_code,
        preferred_branch_id: foundUser.preferred_branch_id,
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

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}