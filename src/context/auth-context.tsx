import React, { createContext, useState, useEffect, useContext } from "react";
import type { AuthUser } from "../types/auth-user";
import { API_ROAD } from "../api/road-info";

interface AuthContextProps {
  user: AuthUser | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Carrega usuário salvo no localStorage ao abrir o app
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // ---- LOGIN REAL VIA POST ----
  async function login(email: string, senha: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_ROAD}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      if (!response.ok) return false;

      const data: AuthUser = await response.json();

      // Se veio usuário válido
      if (data && data.id) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("usuarioId", String(data.id));
        return true;
      }

      return false;

    } catch (error) {
      console.error("Erro no login", error);
      return false;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("usuarioId");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
