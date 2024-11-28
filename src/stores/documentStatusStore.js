import { defineStore } from 'pinia';
import axios from '../axios';
import { useToast } from 'vue-toastification';

const toast = useToast();
const API_URL = 'http://localhost:3051/api/statuts-document';

export const useDocumentStatusStore = defineStore('documentStatus', {
  state: () => ({
    statuts: [],               
    statutDetail: null,        
    loading: false,            
  }),

  actions: {
    // Récupérer tous les statuts
    async fetchStatuts(forceReload = false) {
      if (!forceReload && this.statuts.length > 0) return; // Évite un rechargement inutile
      this.loading = true;
      try {
        const response = await axios.get(API_URL);
        this.statuts = response.data;
        toast.success('Liste des statuts récupérée avec succès !');
      } catch (error) {
        toast.error(error.response?.data?.message || "Erreur lors de la récupération des statuts. Veuillez réessayer.");
      } finally {
        this.loading = false;
      }
    },

    // Ajouter un nouveau statut
    async ajouterStatut(nouveauStatut) {
      this.loading = true;
      try {
        // Validation des données
        if (!nouveauStatut.nom) {
          toast.error("Le nom du statut est requis.");
          return;
        }

        const response = await axios.post(API_URL, nouveauStatut);
        if (response.status === 201) {
          this.statuts.push(response.data); // Ajouter le nouveau statut localement
          toast.success('Statut ajouté avec succès !');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Erreur lors de l'ajout du statut. Veuillez réessayer.");
      } finally {
        this.loading = false;
      }
    },

    // Récupérer les détails d'un statut par ID
    async getStatutDocumentById(id) {
      this.loading = true;
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        this.statutDetail = response.data;
        toast.success("Détails du statut récupérés avec succès !");
        return response.data;
      } catch (error) {
        toast.error(error.response?.data?.message || "Erreur lors de la récupération du statut. Veuillez réessayer.");
        throw new Error('Erreur lors de la récupération du statut');
      } finally {
        this.loading = false;
      }
    },

    // Modifier un statut par ID
    async modifierStatut(id, updatedData) {
      this.loading = true;
      try {
        if (!updatedData.nom) {
          toast.error("Le nom du statut est requis pour la mise à jour.");
          return;
        }

        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        if (response.status === 200) {
          const index = this.statuts.findIndex((statut) => statut.id === id);
          if (index !== -1) {
            this.statuts[index] = response.data; // Mettre à jour le statut localement
          }
          toast.success("Statut mis à jour avec succès !");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Erreur lors de la mise à jour du statut. Veuillez réessayer.");
      } finally {
        this.loading = false;
      }
    },

    // Suppression d'un statut de document
    async supprimerStatut(id) {
      const toast = useToast();
      const confirmed = confirm('Êtes-vous sûr de vouloir supprimer ce statut ?');
      if (confirmed) {
        this.loading = true;
        try {
          // Envoi de la requête pour supprimer le statut
          const response = await axios.delete(`http://localhost:3051/api/statuts-document/${id}`, {
            headers: { Authorization: `Bearer ${this.token}` },
          });
          
          // Si la suppression réussie
          if (response.status === 204) {
            this.statuts = this.statuts.filter(statut => statut.id !== id); // Mise à jour de la liste locale
            toast.success('Le statut de document a été supprimé avec succès.');
          } else {
            toast.error('Une erreur est survenue lors de la suppression du statut.');
          }
        } catch (error) {
          // Gestion des erreurs, avec un message clair si le statut est lié à un document
          toast.error(errorMessage);
        } finally {
          this.loading = false;
        }
      }
    },
  },

});
