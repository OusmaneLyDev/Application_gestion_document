<template>
    <div class="user-list">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Date de création</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.nom }}</td>
            <td>{{ user.email }}</td>
            <td>{{ formatDate(user.date_creation) }}</td>
            <td>
              <i @click="openModal('view', user)" class="fas fa-eye text-info action-icon" title="Voir"></i>
              <i @click="openModal('edit', user)" class="fas fa-edit text-warning action-icon" title="Modifier"></i>
              <i @click="openModal('delete', user)" class="fas fa-trash text-danger action-icon" title="Supprimer"></i>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal Voir -->
      <div class="modal fade" id="viewModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Détails de l'utilisateur</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p><strong>ID:</strong> {{ selectedUser.id }}</p>
              <p><strong>Nom:</strong> {{ selectedUser.nom }}</p>
              <p><strong>Email:</strong> {{ selectedUser.email }}</p>
              <p><strong>Date de création:</strong> {{ formatDate(selectedUser.date_creation) }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal Modifier -->
      <div class="modal fade" id="editModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modifier l'utilisateur</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input type="text" v-model="selectedUser.nom" class="form-control mb-2" placeholder="Nom">
              <input type="email" v-model="selectedUser.email" class="form-control" placeholder="Email">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button type="button" class="btn btn-primary" @click="updateUser">Sauvegarder</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal Supprimer -->
      <div class="modal fade" id="deleteModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Supprimer l'utilisateur</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Êtes-vous sûr de vouloir supprimer l'utilisateur {{ selectedUser.nom }} ?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button type="button" class="btn btn-danger" @click="deleteUser">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { Modal } from 'bootstrap';
  import { useUserStore } from "@/stores/user";
  
  export default {
    name: 'UserList',
    setup() {
      const userStore = useUserStore();
      const selectedUser = ref({});
      const users = computed(() => userStore.users);
  
      onMounted(() => {
        userStore.fetchUsers();
      });
  
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      };
  
      const openModal = (type, user) => {
        console.log(`Modal type: ${type}`, user); 
        selectedUser.value = { ...user };
        const modalId = type === 'view' ? '#viewModal' : type === 'edit' ? '#editModal' : '#deleteModal';
        const modalElement = document.querySelector(modalId);
        if (modalElement) {
          const modalInstance = new Modal(modalElement);
          modalInstance.show();
        }
      };
  
      const updateUser = async () => {
        await userStore.updateUser(selectedUser.value);
        userStore.fetchUsers();
        closeModal('#editModal');
      };
  
      const deleteUser = async () => {
        await userStore.deleteUser(selectedUser.value.id);
        userStore.fetchUsers();
        closeModal('#deleteModal');
      };
  
      const closeModal = (modalId) => {
        const modalElement = document.querySelector(modalId);
        if (modalElement) {
          const modalInstance = Modal.getInstance(modalElement);
          modalInstance.hide();
        }
      };
  
      return {
        users,
        formatDate,
        openModal,
        updateUser,
        deleteUser,
        selectedUser,
      };
    },
  };
  </script>
  
  <style scoped>
  .user-list {
    width: 100%;
    margin-top: 20px;
  }
  .table th {
    background-color: #f2f2f2;
  }
  .table td, .table th {
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
  </style>
  