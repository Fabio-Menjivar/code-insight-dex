import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getCurrentUser,
  getSession,
  loginUser,
  logoutUser,
  purchaseEnterpriseSubscription,
  registerUser,
  type AuthSession,
  type StoredUser,
} from "@/lib/auth-store";

interface AuthContextValue {
  user: AuthSession | null;
  profile: StoredUser | null;
  isAuthenticated: boolean;
  isPremium: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  purchaseSubscription: () => Promise<void>;
  pricingOpen: boolean;
  openPricing: () => void;
  setPricingOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthSession | null>(null);
  const [profile, setProfile] = useState<StoredUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pricingOpen, setPricingOpen] = useState(false);

  const refresh = useCallback(() => {
    const session = getSession();
    setUser(session);
    setProfile(getCurrentUser());
  }, []);

  useEffect(() => {
    refresh();
    setIsLoading(false);
  }, [refresh]);

  const login = async (email: string, password: string) => {
    loginUser(email, password);
    refresh();
  };

  const register = async (name: string, email: string, password: string) => {
    registerUser({ name, email, password });
    refresh();
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setProfile(null);
  };

  const purchaseSubscription = async () => {
    purchaseEnterpriseSubscription();
    refresh();
  };

  const value: AuthContextValue = {
    user,
    profile,
    isAuthenticated: !!user,
    isPremium: profile?.subscription === "enterprise",
    isLoading,
    login,
    register,
    logout,
    purchaseSubscription,
    pricingOpen,
    openPricing: () => setPricingOpen(true),
    setPricingOpen,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/** @deprecated Use useAuth — kept for existing premium-gated components */
export function usePremium() {
  const auth = useAuth();
  return {
    isPremium: auth.isPremium,
    setPremium: () => {},
    togglePremium: () => {},
    openPricing: auth.openPricing,
    pricingOpen: auth.pricingOpen,
    setPricingOpen: auth.setPricingOpen,
    purchaseSubscription: auth.purchaseSubscription,
    isAuthenticated: auth.isAuthenticated,
  };
}
