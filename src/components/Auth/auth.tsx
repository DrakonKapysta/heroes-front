import type { User } from "@/types";
import React from "react";
import { toast } from "sonner";

export interface AuthContext {
  isAuthenticated: boolean;
  changeProfile: (username: string) => Promise<User | null>;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<User | null>;
  user: User | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

const key = "auth.user";

function getUserFromStorage() {
  const user = localStorage.getItem(key);
  return user ? JSON.parse(user) : null;
}

function setUserToStorage(user: User | null) {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key);
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(getUserFromStorage());
  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const user = await response.json();
      setUser(user);
      setUserToStorage(user);
      toast.success("Login successful");
      return user;
    } else {
      console.error("Login failed");
      return null;
    }
  };
  const logout = () => {
    setUser(null);
    setUserToStorage(null);
  };
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.ok) {
      const user = await response.json();
      setUser(user);
      setUserToStorage(user);
      toast.success("Register successful");
      return user;
    } else {
      console.error("Registration failed");
      return null;
    }
  };

  const changeProfile = async (username: string) => {
    const response = await fetch("http://localhost:5000/users/" + user?.id, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    if (!response.ok) {
      console.error("Profile update failed");
      return;
    }
    if (response.ok) {
      const user = await response.json();
      setUser(user);
      setUserToStorage(user);
      toast.success("Profile updated");
      return user;
    } else {
      console.error("Profile change failed");
      return null;
    }
  };

  React.useEffect(() => {
    setUser(getUserFromStorage());
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register, changeProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
