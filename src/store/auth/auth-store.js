import { create } from "zustand";
import { removeAllCookies } from "../../helpers/helper";

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,

  login: (token,) => {
    removeAllCookies()
    localStorage.setItem("token", token);
    set({ isAuthenticated: true, token });
  },

  logout: () => {
    removeAllCookies()
    localStorage.removeItem("token");
    
    set({ isAuthenticated: false, token: null });
  },
}));

export default useAuthStore;
