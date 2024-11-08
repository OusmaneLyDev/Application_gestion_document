<template>
    <div class="container add-type-container">
      <h1>Ajouter un Nouveau Type de Document</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nom">Nom du Type</label>
          <input v-model="type.nom" type="text" id="nom" placeholder="Nom du type de document" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea v-model="type.description" id="description" placeholder="Description du type de document" class="form-control" required></textarea>
        </div>
        <button type="submit" class="submit-btn">
          <i class="fas fa-check"></i> Ajouter
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useDocumentTypeStore } from '../stores/documentTypeStore';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'AddTypeDocument',
    setup() {
      const router = useRouter();
      const documentTypeStore = useDocumentTypeStore();
      const type = ref({
        nom: '',
        description: ''
      });
  
      const handleSubmit = async () => {
        await documentTypeStore.addType(type.value);
        router.push({ name: 'ListeTypeDocument' });
      };
  
      return {
        type,
        handleSubmit
      };
    }
  };
  </script>
  
  <style scoped>
  .add-type-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
    color: #555;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: border-color 0.3s;
  }
  
  .form-control:focus {
    border-color: #007bff;
  }
  
  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #28a745;
    color: #fff;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-btn i {
    margin-right: 8px;
    font-size: 1.2rem;
  }
  
  .submit-btn:hover {
    background-color: #218838;
  }
  </style>
  