<template>
    <div class="user-details-container">
      <div class="user-details-card">
        <button @click="closeForm" class="close-button">X</button>
        <h2>Détails de l'utilisateur</h2>
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Nom:</strong> {{ user.nom }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Date de création:</strong> {{ formatDate(user.date_creation) }}</p>
        <div v-if="errorMessage" class="alert alert-danger mt-4">
          {{ errorMessage }}
        </div>
        <router-link :to="{ name: 'UserList' }" class="btn btn-secondary">Fermer</router-link>
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
        const userId = Number(route.params.id);
        if (isNaN(userId)) {
          errorMessage.value = 'ID utilisateur invalide';
          return;
        }
  
        try {
          const foundUser = userStore.users.find(u => u.id === userId);
          if (foundUser) {
            user.value = foundUser;
          } else {
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
  
      // Fonction pour formater la date
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      };
  
      // Fonction pour fermer le formulaire
      const closeForm = () => {
        router.push({ name: 'UserList' });
      };
  
      onMounted(fetchUser);
  
      return {
        user,
        errorMessage,
        closeForm,
        formatDate,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Conteneur principal */
  .user-details-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: none;
    padding: 20px;
  }

  /* Carte des détails de l'utilisateur */
  .user-details-card {
    position: relative;
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 100%;
  }

  /* Bouton de fermeture */
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.2rem;
    color: #444;
    cursor: pointer;
    transition: color 0.3s;
  }

  .close-button:hover {
    color: #e74c3c;
  }
</style>
