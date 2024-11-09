<template>
    <div class="user-details-container">
      <div class="user-details-card">
        <button @click="closeForm" class="close-button">X</button>
        <h2>Détails de l'utilisateur</h2>
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Nom:</strong> {{ user.nom }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Date de création:</strong> {{ user.date_creation }}</p>
        <div v-if="errorMessage" class="alert alert-danger mt-4">
          {{ errorMessage }}
        </div>
        <button @click="goBack" class="btn btn-secondary">Annuler</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    name: 'UserDetails',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const userStore = useUserStore();
      const user = ref({});
      const errorMessage = ref('');
  
      // Récupérer l'utilisateur par ID
      const fetchUser = async () => {
        const userId = parseInt(route.params.id); // Convertir en nombre si l'ID est numérique
        try {
          // Vérifie si l'utilisateur est déjà dans le store local
          const foundUser = userStore.users.find(u => u.id === userId);
          if (foundUser) {
            user.value = foundUser; // Copie les données de l'utilisateur
          } else {
            // Si l'utilisateur n'est pas trouvé localement, on le charge depuis l'API
            await userStore.fetchUserById(userId);
            if (userStore.currentUser) {
              user.value = userStore.currentUser;
            } else {
              errorMessage.value = 'Utilisateur non trouvé';
            }
          }
        } catch (error) {
          errorMessage.value = 'Erreur lors du chargement des détails de l\'utilisateur';
        }
      };
  
      // Fonction pour retourner à la liste des utilisateurs
      const goBack = () => {
        router.push({ name: 'Users' }); // Remplacez 'Users' par le nom de la route de la liste des utilisateurs
      };
  
      // Fonction pour fermer le formulaire
      const closeForm = () => {
        router.push({ name: 'Users' }); // Remplacez 'Users' par le nom de la route de la liste des utilisateurs
      };
  
      onMounted(fetchUser);
  
      return {
        user,
        errorMessage,
        goBack,
        closeForm
      };
    }
  };
  </script>
  
  <style scoped>
  .user-details-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    padding: 20px;
  }
  
  .user-details-card {
    position: relative;
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 100%;
    animation: fadeInUp 0.5s ease-in-out;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  h2 {
    text-align: center;
    font-weight: bold;
    font-size: 1.8rem;
    color: #444;
    margin-bottom: 20px;
  }
  
  p {
    margin-bottom: 10px;
  }
  
  .alert {
    margin-top: 20px;
  }
  
  .btn-secondary {
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    color: #444;
  }
  </style>
  