<template>
  <div class="container">
    <h1>Liste des Statuts de Document</h1>
    <button @click="goToAddStatut" class="add-statut-btn">
      <i class="fas fa-plus"></i> Ajouter un statut
    </button>
    <div class="statut-list">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="statut in statuts" :key="statut.id">
            <td>{{ statut.id }}</td>
            <td>{{ statut.nom }}</td>
            <td>{{ statut.description }}</td>
            <td>
              <!-- Lien pour voir le statut -->
              <router-link 
                :to="{ name: 'DocumentStatusDetails', params: { id: statut.id } }" 
                title="Voir"
              >
                <i class="fas fa-eye text-info action-icon"></i>
              </router-link>
              
              <!-- Lien pour modifier le statut -->
              <router-link 
                :to="{ name: 'EditDocumentStatus', params: { id: statut.id } }" 
                title="Modifier"
              >
                <i class="fas fa-edit text-warning action-icon"></i>
              </router-link>

              <!-- Bouton pour supprimer le statut -->
              <button 
                class="btn btn-danger btn-sm" 
                @click="deleteStatut(statut.id)" 
                title="Supprimer"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
          <tr v-if="statuts.length === 0">
            <td colspan="4" class="text-center">Aucun statut trouvé</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { Modal } from 'bootstrap';
  import { useDocumentStatusStore } from '../stores/documentStatusStore';
  import { useRouter } from 'vue-router'; // Importer useRouter pour la navigation
  
  export default {
    name: 'StatutDocumentList',
    setup() {
      const documentStatusStore = useDocumentStatusStore();
      const selectedStatut = ref({});
      const router = useRouter(); // Créer une instance de router
  
      onMounted(() => {
        documentStatusStore.fetchStatuts();
      });
  
      const statuts = computed(() => documentStatusStore.statuts);
  
      const openModal = (type, statut) => {
        selectedStatut.value = statut;
        const modalId = type === 'view' ? '#viewModal' : type === 'edit' ? '#editModal' : '#deleteModal';
        const modalElement = document.querySelector(modalId);
        if (modalElement) {
          const modalInstance = new Modal(modalElement);
          modalInstance.show();
        }
      };
  
      // Méthode pour naviguer vers l'ajout de statut
      const goToAddStatut = () => {
        router.push({ name: 'AddStatut' }); // Remplacer 'AddStatut' par le nom de votre route pour l'ajout
      };
  
      return {
        statuts,
        openModal,
        selectedStatut,
        goToAddStatut, // Retourner la méthode de navigation
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .statut-list {
    width: 120%;
    margin-top: 20px;
  }
  
  .table {
    border: none;
  }
  
  .table th {
    background-color: transparent;
    color: #333;
    padding: 12px;
    text-align: left;
  }
  
  .table td,
  .table th {
    padding: 12px;
  }
  
  .action-icon {
    cursor: pointer;
    margin: 0 5px;
    font-size: 1rem;
    transition: color 0.3s;
  }
  
  .action-icon:hover {
    color: #0056b3;
  }
  
  .table-hover tbody tr:hover {
    background-color: #f1f1f1;
  }
  
  .add-statut-btn {
    display: inline-flex;
    align-items: center;
    background-color: #007bff; /* Couleur du bouton */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 15px;
  }
  
  .add-statut-btn i {
    margin-right: 8px;
    font-size: 1.2rem;
  }
  
  .add-statut-btn:hover {
    background-color: #0069d9; /* Couleur du bouton au survol */
  }
  </style>
   