import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/LoginResponse";
import type { Role } from "../types/Role";

interface authActions {
  login: ({
    accessToken,
    refreshToken,
    user,
    rememberMe,
  }: {
    accessToken: string;
    refreshToken?: string | null;
    user: User;
    rememberMe?: boolean;
  }) => void;
  logout: () => void;
  setAccessToken: (accessToken: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setRememberMe: (rememberMe: boolean) => void;
  setHydrated: (hydrated: boolean) => void;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setRole: (role: Role | null) => void;
}

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  rememberMe: boolean;
  user: User | null;
  role: Role | null;
  hydrated: boolean;
  actions: authActions;
  isLoggedIn: boolean;
  authHeader: () => string;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      rememberMe: false,
      user: null,
      role: null,
      hydrated: false,
      isLoggedIn: false,
      authHeader: () =>
        get().accessToken ? `Bearer ${get().accessToken}` : "",
      actions: {
        login: ({ accessToken, refreshToken = null, user, rememberMe }) =>
          set({
            accessToken,
            refreshToken,
            user,
            rememberMe: rememberMe ?? get().rememberMe,
            role: user.role,
            isLoggedIn: true,
          }),
        logout: () =>
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            rememberMe: false,
            role: null,
            isLoggedIn: false,
          }),
        setAccessToken: (accessToken: string | null) => set({ accessToken }),
        setRefreshToken: (refreshToken: string | null) => set({ refreshToken }),
        setRememberMe: (rememberMe: boolean) => set({ rememberMe }),
        setUser: (user) => set({ user }),
        setHydrated: (hydrated) => set({ hydrated }),
        setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
        setRole: (role) => set({ role }),
      },
    }),
    {
      name: "auth",
      partialize: (s) => ({
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
        rememberMe: s.rememberMe,
        user: s.user,
        role: s.role,
        isLoggedIn: s.isLoggedIn,
      }),
      onRehydrateStorage: () => (s) => s?.actions.setHydrated(true),
    },
  ),
);

export const useAuthActions = () => useAuthStore((s) => s.actions);
export const useIsLoggedIn = () => useAuthStore((s) => s.isLoggedIn);
export const useRole = () => useAuthStore((s) => s.role);
export const useUser = () => useAuthStore((s) => s.user);
export const useIsHydrated = () => useAuthStore((s) => s.hydrated);
export const useAccessToken = () => useAuthStore((s) => s.accessToken);
export const useRefreshToken = () => useAuthStore((s) => s.refreshToken);
export const useAuthHeader = () => useAuthStore((s) => s.authHeader());

export function getAccessToken() {
  return useAuthStore.getState().accessToken;
}
export function getRefreshToken() {
  return useAuthStore.getState().refreshToken;
}
export function getAuthHeader() {
  const t = useAuthStore.getState().accessToken;
  return t ? `Bearer ${t}` : "";
}
export function getRole() {
  return useAuthStore.getState().role;
}
export function setAccessToken(accessToken: string) {
  useAuthStore.getState().actions.setAccessToken(accessToken);
}

export function performLogout() {
  const { logout } = useAuthStore.getState().actions;
  logout();
}
export default useAuthStore;
