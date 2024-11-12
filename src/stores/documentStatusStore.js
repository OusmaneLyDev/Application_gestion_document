import { defineStore } from 'pinia';
import axios from '../axios';

// URL de l'API à centraliser pour éviter la duplication
const API_URL = 'http://localhost:3051/api/statuts-document';

export const useDocumentStatusStore = defineStore('documentStatus', {
  state: () => ({
    statuts: [],               
    statutDetail: null,       
    errorMessage: null,        
  }),

  actions: {
    // Récupérer tous les statuts
    async fetchStatuts() {
      try {
        const response = await axios.get(API_URL);
        this.statuts = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des statuts :", error);
        this.errorMessage = "Erreur lors de la récupération des statuts. Veuillez réessayer.";
      }
    },

    // Ajouter un nouveau statut
    // Ajouter un nouveau statut
async ajouterStatut(nouveauStatut) {
    this.errorMessage = null;
    try {
      // Validation des données
      if (!nouveauStatut.nom) {
        this.errorMessage = "Le nom du statut est requis.";
        return;
      }
      if (!nouveauStatut.id_Utilisateur) {
        this.errorMessage = "L'identifiant de l'utilisateur est requis.";
        return;
      }
  
      const response = await axios.post(API_URL, nouveauStatut);
  
      if (response.status === 201) {
        // Ajouter le nouveau statut à la liste
        this.statuts.push(response.data);
        alert("Statut ajouté avec succès !");
      } else {
        this.errorMessage = "Erreur inattendue lors de l'ajout du statut.";
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du statut :", error);
      // Gestion d'erreur détaillée
      this.errorMessage = error.response?.data?.message || "Erreur lors de l'ajout du statut. Veuillez réessayer.";
    }
  },  

    // Récupérer les détails d'un statut par ID
    async getStatutDocumentById(id) {
        try {
          const response = await axios.get(`${API_URL}/${id}`);
          return response.data;  // Retourner les données du statut
        } catch (error) {
          console.error('Erreur lors de la récupération du statut par ID:', error);
          throw new Error('Erreur lors de la récupération du statut');
        }
      },

    // Mettre à jour un statut par ID
    async modifierStatut(id, updatedData) {
      try {
        if (!updatedData.nom) {
          this.errorMessage = "Le nom du statut est requis pour la mise à jour.";
          return;
        }

        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        if (response.status === 200) {
          const index = this.statuts.findIndex((statut) => statut.id === id);
          if (index !== -1) {
            this.statuts[index] = response.data;  // Mettre à jour le statut dans la liste
          }
        }
      } catch (error) {
        console.error("Erreur lors de la modification du statut :", error);
        this.errorMessage = "Erreur lors de la modification du statut. Veuillez réessayer.";
      }
    },

    // Supprimer un statut par ID
    async supprimerStatut(id) {
      try {
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.status === 204) {
          this.statuts = this.statuts.filter((statut) => statut.id !== id);  // Retirer le statut supprimé
        }
      } catch (error) {
        console.error("Erreur lors de la suppression du statut :", error);
        this.errorMessage = "Erreur lors de la suppression du statut. Veuillez réessayer.";
      }
    },
  }
});
