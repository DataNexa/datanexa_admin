<template>
    <div>
        <h5 class="text-center">{{ titulo }}</h5>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import {Chart, type ChartOptions } from 'chart.js/auto';
  
  export default defineComponent({
    props: {
        titulo:{
            type:String,
            required:true
        },
        chartData: {
            type: Object as () => { labels: string[], data: number[] },
            required: true,
        },
        chartType: {
            type: Object as () => 'bar' | 'line' | 'pie' | 'doughnut',
            required: true
        },
        chartOptions: {
            type: Object as () => ChartOptions,
            default: () => ({
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            display: false, 
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false, 
                        },
                        ticks: {
                            display: false,
                        },
                    },
                },
            }),
        },
    },
    data() {
        return {
            chart: null as Chart | null,
            colors:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 0, 0, 0.6)',
                'rgba(0, 255, 0, 0.6)',
                'rgba(0, 0, 255, 0.6)',
                'rgba(255, 192, 203, 0.6)'
            ]
        };
    },
    mounted() {
        const ctx = (this.$refs.chartCanvas as HTMLCanvasElement).getContext('2d');
        if (ctx) {
            this.chart = new Chart(ctx, {
                type: this.chartType,
                data: {
                    labels: this.chartData.labels,
                    datasets: [
                        {
                            label: 'Dataset',
                            data: this.chartData.data,
                            backgroundColor: this.colors.slice(0, this.chartData.data.length),
                            borderColor: this.colors.slice(0, this.chartData.data.length),
                            borderWidth: 1,
                        },
                    ],
                },
                options: this.chartOptions,
            });
        }
    },
    beforeUnmount() {
        if (this.chart) {
            this.chart.destroy();
        }
    },
});
</script>