import { defineStore } from 'pinia';
import axios from '../axios';
import { useToast } from 'vue-toastification';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
    token: localStorage.getItem('token') || null,
    errorMessage: null,
    loading: false,
  }),

  actions: {
    handleError(error) {
      console.error(error);
      return error.response ? error.response.data.message : 'Erreur réseau. Veuillez réessayer.';
    },

    // Méthode pour gérer la connexion
    async login(email, mot_de_passe) {
      const toast = useToast(); 
      this.loading = true;
      try {
        const response = await axios.post('http://localhost:3051/api/auth/login', {
          email,
          mot_de_passe,
        });
        const { token, utilisateur } = response.data;
        this.token = token;
        localStorage.setItem('token', token);
        this.currentUser = utilisateur;
        toast.success('Connexion réussie');
      } catch (error) {
        this.errorMessage = this.handleError(error);
        toast.error(this.errorMessage);
      } finally {
        this.loading = false;
      }
    },

    // Méthode pour la déconnexion
    logout() {
      this.token = null;
      this.currentUser = null;
      localStorage.removeItem('token');
      this.users = [];
    },

    async addUser(nom, email, mot_de_passe, role) {
      const toast = useToast();
      this.loading = true;
      try {
        const response = await axios.post('http://localhost:3051/api/utilisateurs', {
          nom,
          email,
          mot_de_passe,
          role,
        }, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.users.push(response.data.utilisateur);
        this.errorMessage = null;
        toast.success('Utilisateur ajouté avec succès');
      } catch (error) {
        this.errorMessage = this.handleError(error);
        toast.error(this.errorMessage);
      } finally {
        this.loading = false;
      }
    },

    // Méthode pour récupérer tous les utilisateurs
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3051/api/utilisateurs', {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.users = response.data;
        this.errorMessage = this.users.length === 0 ? 'Aucun utilisateur trouvé.' : null;
      } catch (error) {
        this.errorMessage = this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    // Méthode pour récupérer un utilisateur par ID
    async fetchUserById(id) {
      const toast = useToast();
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:3051/api/utilisateurs/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.currentUser = response.data;
        this.errorMessage = null;
        toast.success('Utilisateur récupéré avec succès');
      } catch (error) {
        this.errorMessage = this.handleError(error);
        toast.error(this.errorMessage);
      } finally {
        this.loading = false;
      }
    },

    // Mise à jour d'un utilisateur
    async updateUser(id, updatedData) {
      const toast = useToast();
      this.loading = true;
      try {
        const response = await axios.put(`http://localhost:3051/api/utilisateurs/${id}`, updatedData, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...response.data.utilisateur };
        }
        this.currentUser = response.data.utilisateur;
        toast.success('Utilisateur modifié avec succès');
      } catch (error) {
        this.errorMessage = this.handleError(error);
        toast.error(this.errorMessage);
      } finally {
        this.loading = false;
      }
    },

    // Suppression d'un utilisateur
    async deleteUser(id) {
      const toast = useToast();
      const confirmed = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
      if (confirmed) {
        this.loading = true;
        try {
          await axios.delete(`http://localhost:3051/api/utilisateurs/${id}`, {
            headers: { Authorization: `Bearer ${this.token}` },
          });
          this.users = this.users.filter(user => user.id !== id);
          toast.success('Utilisateur supprimé avec succès');
        } catch (error) {
          this.errorMessage = this.handleError(error);
          toast.error(this.errorMessage);
        } finally {
          this.loading = false;
        }
      }
    },
  },
});
