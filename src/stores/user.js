// store/user.js
import { defineStore } from 'pinia';
import axios from '../axios';
import { useToast } from 'vue-toastification';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    errorMessage: null,
    loading: false,
  }),

  actions: {
    handleError(error) {
      console.error(error);
      return error.response ? error.response.data.message : 'Erreur réseau. Veuillez réessayer.';
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

    async fetchUsers() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3051/api/utilisateurs');
        this.users = response.data;
        this.errorMessage = this.users.length === 0 ? 'Aucun utilisateur trouvé.' : null;
      } catch (error) {
        this.errorMessage = this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async updateUser(id, updatedData) {
      const toast = useToast();
      this.loading = true;
      try {
        const response = await axios.put(`http://localhost:3051/api/utilisateurs/${id}`, updatedData);
        // Met à jour l'utilisateur dans la liste
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...response.data.utilisateur };
        }
        toast.success('Utilisateur modifié avec succès');
      } catch (error) {
        this.errorMessage = this.handleError(error);
        toast.error(this.errorMessage);
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(id) {
      const toast = useToast();
      const confirmed = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
      if (confirmed) {
        this.loading = true;
        try {
          await axios.delete(`http://localhost:3051/api/utilisateurs/${id}`);
          this.users = this.users.filter(user => user.id !== id); // Met à jour la liste sans refetch
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
