import { create } from "zustand";
import { removeAllCookies } from "../../helpers/helper";
import apiCall from "../../services/api";

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,

  login: (token, resp) => {
    localStorage.setItem("token", token);

    set({ isAuthenticated: true, token });
  },

  forgetPass: async (payload) => {
    try {
      const res = apiCall({
        method: "POST",
        url: "/user/api/forgetpassword",
        data: payload,
      });

      return res;
    } catch (error) {}
  },

  logout: () => {
    removeAllCookies();
    localStorage.removeItem("token");
    set({ isAuthenticated: false, token: null });
  },
}));

export default useAuthStore;
