<template>

    <div class="container">
      <h2 class="text-primary my-4">Dashboard</h2>
      <div class="row g-2 justify-content-center">
        <div class="col-md-3">
          <div class="card text-white bg-primary mb-2">
            <div class="card-body">
              <h5 class="card-title">Documents</h5>
              <p class="card-text">Nombre total de documents : {{ totalDocuments }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3"> 
          <div class="card text-white bg-warning mb-2">
            <div class="card-body">
              <h5 class="card-title">Types de Document</h5>
              <p class="card-text">Nombre total de types : {{ totalDocumentTypes }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-white bg-info mb-2">
            <div class="card-body">
              <h5 class="card-title">Statuts de Document</h5>
              <p class="card-text">Nombre total de statuts : {{ totalDocumentStatuses }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="row g-2 justify-content-center"> 
        <div class="col-md-5"> 
          <h4 class="text-primary">Évolution des Types de Documents</h4>
          <canvas id="documentTypeChart"></canvas>
        </div>
        <div class="col-md-5"> 
          <h4 class="text-primary">Évolution des Statuts de Documents</h4>
          <canvas id="documentStatusChart"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  export default {
    data() {
      return {
        totalDocuments: 123,
        totalDocumentTypes: 8,
        totalDocumentStatuses: 5,
        documentTypeLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        documentTypeCounts: [30, 50, 20, 60, 80],
        documentStatusLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        documentStatusCounts: [40, 30, 50, 70, 90],
      };
    },
    mounted() {
      Chart.register(...registerables);
      this.renderDocumentTypeChart();
      this.renderDocumentStatusChart();
    },
    methods: {
      renderDocumentTypeChart() {
        const ctx = document.getElementById('documentTypeChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.documentTypeLabels,
            datasets: [{
              label: 'Types de Documents',
              data: this.documentTypeCounts,
              borderColor: '#36a2eb',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
              tension: 0.1,
            }],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Évolution des Types de Documents',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
      renderDocumentStatusChart() {
        const ctx = document.getElementById('documentStatusChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.documentStatusLabels,
            datasets: [{
              label: 'Statuts de Documents',
              data: this.documentStatusCounts,
              borderColor: '#42a5f5',
              backgroundColor: 'rgba(66, 165, 245, 0.2)',
              fill: true,
              tension: 0.1,
            }],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Évolution des Statuts de Documents',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Vous pouvez ajouter des styles CSS ici si nécessaire */
  canvas {
    max-height: 300px; /* Limite la hauteur des graphiques */
  }
  </style>
  