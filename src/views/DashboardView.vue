<template>
  <div class="container my-5">
    <h2 class="text-center text-primary fw-bold mb-5">Tableau de Bord</h2>

    <!-- Stats Cards -->
    <div class="row g-4 justify-content-center">
      <div class="col-md-4">
        <div class="card shadow border-0 text-white bg-primary position-relative card-hover">
          <div class="card-body text-center">
            <h5 class="card-title fw-bold">Documents</h5>
            <p class="card-text fs-4">{{ totalDocuments }}</p>
            <small class="position-absolute bottom-0 end-0 pe-3 pb-3">Total</small>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow border-0 text-white bg-warning position-relative card-hover">
          <div class="card-body text-center">
            <h5 class="card-title fw-bold">Types de Document</h5>
            <p class="card-text fs-4">{{ totalDocumentTypes }}</p>
            <small class="position-absolute bottom-0 end-0 pe-3 pb-3">Types</small>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow border-0 text-white bg-info position-relative card-hover">
          <div class="card-body text-center">
            <h5 class="card-title fw-bold">Statuts de Document</h5>
            <p class="card-text fs-4">{{ totalDocumentStatuses }}</p>
            <small class="position-absolute bottom-0 end-0 pe-3 pb-3">Statuts</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="row mt-5 g-4 justify-content-center">
      <div class="col-md-6">
        <div class="chart-card">
          <h4 class="text-center text-primary">Évolution des Types de Documents</h4>
          <canvas id="documentTypeChart"></canvas>
        </div>
      </div>
      <div class="col-md-6">
        <div class="chart-card">
          <h4 class="text-center text-primary">Évolution des Statuts de Documents</h4>
          <canvas id="documentStatusChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

export default {
  data() {
    return {
      totalDocuments: 3,
      totalDocumentTypes: 5,
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
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            fill: true,
            tension: 0.4,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: false },
          },
          scales: { y: { beginAtZero: true } },
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
            borderColor: '#ffc107',
            backgroundColor: 'rgba(255, 193, 7, 0.2)',
            fill: true,
            tension: 0.4,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: false },
          },
          scales: { y: { beginAtZero: true } },
        },
      });
    },
  },
};
</script>

<style scoped>
/* Cards */
.card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Chart Cards */
.chart-card {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

canvas {
  max-height: 300px;
}
</style>
