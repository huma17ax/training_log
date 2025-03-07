<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { TooltipItem, Scale, CoreScaleOptions, ChartOptions } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const props = defineProps<{
  chartData: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
    }[]
  }
  chartOptions?: Record<string, unknown>
}>()

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      type: 'linear' as const,
      beginAtZero: true,
      ticks: {
        font: {
          size: 11,
        },
        padding: 4,
        maxTicksLimit: 5,
        callback: function (this: Scale<CoreScaleOptions>, tickValue: number | string): string {
          return tickValue.toString()
        },
      },
      grid: {
        display: false,
      },
    },
    x: {
      type: 'category' as const,
      ticks: {
        font: {
          size: 10,
        },
        padding: 4,
        maxRotation: 0,
        minRotation: 0,
        maxTicksLimit: 3,
        callback: function (this: Scale<CoreScaleOptions>, tickValue: unknown): string {
          return typeof tickValue === 'string'
            ? tickValue.split('-').slice(1).join('-')
            : String(tickValue)
        },
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
      align: 'start' as const,
      labels: {
        boxWidth: 8,
        boxHeight: 8,
        padding: 8,
        font: {
          size: 11,
        },
        usePointStyle: true,
        generateLabels: function (
          chart: ChartJS,
        ): ReturnType<typeof ChartJS.defaults.plugins.legend.labels.generateLabels> {
          return ChartJS.defaults.plugins.legend.labels.generateLabels(chart)
        },
      },
    },
    tooltip: {
      titleFont: {
        size: 11,
      },
      bodyFont: {
        size: 11,
      },
      padding: 6,
      displayColors: true,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      cornerRadius: 4,
      callbacks: {
        title: function (context: TooltipItem<'line'>[]): string {
          const date = context[0].label.split('-').slice(1).join('-')
          return date
        },
      },
    },
  },
  interaction: {
    mode: 'x' as const,
    axis: 'x' as const,
    intersect: false,
  },
  elements: {
    point: {
      radius: 2.5,
      hoverRadius: 4,
      borderWidth: 1.5,
    },
    line: {
      borderWidth: 1.5,
      tension: 0.2,
    },
  },
}

const options = computed(
  () =>
    ({
      ...defaultOptions,
      ...props.chartOptions,
    }) as ChartOptions<'line'>,
)
</script>

<template>
  <div class="chart-container">
    <Line :data="chartData" :options="options" />
  </div>
</template>

<style scoped>
.chart-container {
  height: 30vh;
  min-height: 180px;
  max-height: 220px;
  margin: 0.75rem 0;
  padding: 0.25rem;
  touch-action: pan-x pan-y;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@media (max-width: 375px) {
  .chart-container {
    height: 25vh;
    min-height: 140px;
    max-height: 180px;
    margin: 0.5rem 0;
    padding: 0.25rem 0.125rem;
  }

  :deep(.chartjs-legend) {
    margin: 0.25rem 0 !important;
    padding: 0 0.25rem !important;
    gap: 1rem !important;
  }
}
</style>
