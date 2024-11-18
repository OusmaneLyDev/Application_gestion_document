import { defineStore } from "pinia";
import axios from '@/axios';

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
    role: null,
    name: null,
  }),

  getters: {
    // Getter pour récupérer l'ID de l'utilisateur connecté
    userId(state) {
      return state.user?.id || null;
    },
  },

  actions: {
    async login(email, password) {
      try {
        console.log(`[LOGIN] Tentative de connexion avec : email=${email}`);

        const response = await axios.post("/auth/login", {
          email,
          mot_de_passe: password,
        });

        const { accessToken, user } = response.data;

        if (!accessToken) throw new Error("Token manquant.");
        if (!user) throw new Error("Données utilisateur manquantes.");

        // Stocker les informations utilisateur
        this.isAuthenticated = true;
        this.token = accessToken;
        this.user = user;
        this.role = user.role;
        this.name = user.nom;

        // Sauvegarder dans le localStorage
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.nom);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("authToken", accessToken);

        // Ajouter le token aux en-têtes par défaut d'Axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        console.log("[LOGIN] Utilisateur authentifié :", user);

        return { success: true, message: "Connexion réussie" };
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("[LOGIN] Erreur :", errorMessage);
        return { success: false, message: errorMessage };
      }
    },

    logout() {
      console.log("[LOGOUT] Déconnexion...");
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      this.role = null;
      this.name = null;
      localStorage.clear();
      delete axios.defaults.headers.common["Authorization"];
      return Promise.resolve();
    },
  },
});
