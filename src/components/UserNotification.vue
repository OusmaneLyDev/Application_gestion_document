<template>
    <div v-if="visible" class="notification" :class="type">
      <span>{{ message }}</span>
      <button @click="hideNotification">X</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserNotification',
    data() {
      return {
        visible: false,
        message: '',
        type: '', // 'success' ou 'error'
      };
    },
    methods: {
      showNotification(message, type) {
        this.message = message;
        this.type = type;
        this.visible = true;
  
        // Masquer la notification après quelques secondes
        setTimeout(() => {
          this.hideNotification();
        }, 3000);
      },
      hideNotification() {
        this.visible = false;
      },
    },
  };
  </script>
  
  <style>
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px;
    border-radius: 5px;
    color: #fff;
    z-index: 1000; /* Assurez-vous que la notification est au-dessus d'autres éléments */
    transition: opacity 0.5s; /* Ajout d'une transition pour un effet visuel */
  }
  .success {
    background-color: green;
  }
  .error {
    background-color: red;
  }
  </style>
  