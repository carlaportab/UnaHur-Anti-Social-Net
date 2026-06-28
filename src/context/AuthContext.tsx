import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { User } from '../types';
import { getUsers } from '../services/userService';

const LS_KEY = 'antisocial_user';
const FIXED_PASSWORD = '123456';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (nickName: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(LS_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LS_KEY);
    }
  }, [user]);

  const login = async (
    nickName: string,
    password: string,
  ): Promise<{ ok: boolean; error?: string }> => {
    if (password !== FIXED_PASSWORD) {
      return { ok: false, error: 'Contraseña incorrecta. Hint: es la del TP.' };
    }

    let users: User[];
    try {
      users = await getUsers();
    } catch {
      return { ok: false, error: 'No se pudo conectar con el servidor.' };
    }

    const found = users.find(
      (u) => u.nickName.toLowerCase() === nickName.trim().toLowerCase(),
    );

    if (!found) {
      return { ok: false, error: 'Usuario no encontrado. ¿Te registraste?' };
    }

    setUser(found);
    return { ok: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
