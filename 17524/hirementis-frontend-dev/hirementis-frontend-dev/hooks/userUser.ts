import { UserProfile } from "@/types";
import { create } from "zustand";

interface userState {
  user: UserProfile | null;
  setUser: (userData: UserProfile | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: () => void;
}

export const useUserStore = create<userState>((set) => ({
  user: null,
  setUser: (userData) => set(() => ({ user: userData })),
  isAuthenticated: false,
  setIsAuthenticated: () => set((state) => ({ isAuthenticated: !!state.user })),
}));
