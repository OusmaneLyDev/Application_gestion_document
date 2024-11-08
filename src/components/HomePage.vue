<template>
    <div class="home-page">
      <div class="hero-section">
        <!-- Image de fond -->
        <img
          :src="require('@/assets/background.jpg')" 
          alt="Image de fond des documents"
          class="hero-image"
        />
  
        <!-- Texte et bouton centrés -->
        <div class="hero-text">
          <h1 class="display-4">Bienvenue dans l'application GED</h1>
          <p class="lead">Découvrez nos fonctionnalités de gestion de documents et commencez à organiser vos fichiers.</p>
          <router-link to="/dashboard" class="btn btn-primary btn-lg mt-3">Accéder au tableau de bord</router-link>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: 'HomePage',
  };
  </script>
  
  <style scoped>
  /* Fullscreen Container */
  .home-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    text-align: center;
    background-color: #f4f4f4; /* Couleur de fond pour les cas où l'image ne charge pas */
  }
  
  /* Background Image */
  .hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Pour s'assurer que l'image couvre tout le conteneur */
    filter: brightness(0.5); /* Ajuste la luminosité de l'image de fond */
    z-index: -1; /* Pour mettre l'image derrière le contenu */
  }
  
  /* Centered Text and Button */
  .hero-text {
    position: relative;
    z-index: 1; /* Place le texte au-dessus de l'image de fond */
    color: #fff; /* Couleur du texte */
    padding: 1rem;
    max-width: 80%; /* Limite la largeur du texte */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Ombre pour améliorer la lisibilité du texte */
  }
  
  .hero-text h1 {
    font-size: 2.5rem; /* Taille du titre */
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .hero-text p {
    font-size: 1.25rem; /* Taille du texte du paragraphe */
  }
  
  /* Responsive Design */
  @media (min-width: 768px) {
    .hero-text h1 {
      font-size: 3.5rem; /* Ajustement de la taille du titre pour les écrans plus grands */
    }
    .hero-text p {
      font-size: 1.5rem; /* Ajustement de la taille du texte du paragraphe pour les écrans plus grands */
    }
  }
  
  /* Styles pour le bouton */
  .btn-primary {
    background-color: #007bff; /* Couleur du bouton */
    border: none;
  }
  
  .btn-primary:hover {
    background-color: #0056b3; /* Couleur du bouton au survol */
  }
  
  /* Ajout d'un effet de transition pour le bouton */
  .btn-primary {
    transition: background-color 0.3s;
  }
  </style>
  