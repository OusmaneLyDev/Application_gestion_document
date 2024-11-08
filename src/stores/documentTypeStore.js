// src/stores/documentTypeStore.js
import { defineStore } from 'pinia';
import axios from 'axios'; // Assurez-vous que le chemin est correct

export const useDocumentTypeStore = defineStore('documentType', {
  state: () => ({
    types: [],
    errorMessage: null,
  }),
  
  actions: {
    async fetchTypes() {
      try {
        const response = await axios.get("http://localhost:3051/api/types-document");
        this.types = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des types :", error);
        this.errorMessage = "Erreur lors de la récupération des types de documents.";
      }
    },
    async addType(type) {
      try {
        const response = await axios.post("http://localhost:3051/api/types-document", type);
        this.types.push(response.data);
      } catch (error) {
        console.error("Erreur lors de l'ajout du type de document :", error);
        this.errorMessage = "Erreur lors de l'ajout du type de document.";
      }
    },
    async editType(id, updatedType) {
      try {
        await axios.put(`http://localhost:3051/api/types-document/${id}`, updatedType);
        await this.fetchTypes(); // Recharger les types après la mise à jour
      } catch (error) {
        console.error("Erreur lors de la modification du type de document :", error);
        this.errorMessage = "Erreur lors de la modification du type de document.";
      }
    },
    async deleteType(id) {
      try {
        await axios.delete(`http://localhost:3051/api/types-document/${id}`);
        this.types = this.types.filter(type => type.id !== id); // Supprimer localement le type
      } catch (error) {
        console.error("Erreur lors de la suppression du type de document :", error);
        this.errorMessage = "Erreur lors de la suppression du type de document.";
      }
    }
  }
});
