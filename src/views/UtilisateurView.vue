<template>
    <div class="container">
      <h1>Liste des Utilisateurs</h1>
      <button @click="goToAddUser" class="add-user-btn">
        <i class="fas fa-user-plus"></i> Ajouter un utilisateur
      </button>
      <UserList />
    </div>
  </template>
  
  <script>
  import { useUserStore } from '../stores/user';
  import { onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import UserList from '../components/Utilisateur/UserList.vue';

  
  export default {
    name: 'UtilisateurView',
    components: {
      UserList,
    },
    setup() {
      const userStore = useUserStore();
      const router = useRouter();
  
      onMounted(() => {
        userStore.fetchUsers();
      });
  
      // Computed properties pour lier les données
      const users = computed(() => userStore.users);
      const errorMessage = computed(() => userStore.errorMessage);
      const loading = computed(() => userStore.loading);
  
      // Méthodes pour naviguer
      const goToAddUser = () => {
        router.push({ name: 'AddUser' });
      };
  
      return {
        users,
        errorMessage,
        loading,
        goToAddUser,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: auto;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .add-user-btn {
    display: inline-flex;
    align-items: center;
    background-color: #007bff; /* Changer en bleu */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 15px;
  }
  
  .add-user-btn i {
    margin-right: 8px;
    font-size: 1.2rem;
  }
  
  .add-user-btn:hover {
    background-color: #0069d9; /* Bleu plus foncé pour le survol */
  }
  </style>
  