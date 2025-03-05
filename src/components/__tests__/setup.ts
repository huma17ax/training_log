import { vi } from 'vitest'
import { defineComponent } from 'vue'

// Chart.jsのモック
vi.mock('chart.js', () => ({
  Chart: vi.fn(),
  registerables: [],
}))

// vue-chartjsのモック
const mockChartComponent = defineComponent({
  props: ['chartData', 'options'],
  template: '<div class="mock-chart"></div>',
})

vi.mock('vue-chartjs', () => ({
  Line: mockChartComponent,
  Bar: mockChartComponent,
}))

// TrainingChartコンポーネントのモック
vi.mock('@/components/common/TrainingChart.vue', () => ({
  default: defineComponent({
    props: ['chartData'],
    template: '<div class="mock-training-chart"></div>',
  }),
}))

// canvasのモック
const mockContext2D = {
  fillStyle: '',
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  getImageData: vi.fn(),
  putImageData: vi.fn(),
  createImageData: vi.fn(),
  setTransform: vi.fn(),
  drawImage: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  scale: vi.fn(),
  rotate: vi.fn(),
  translate: vi.fn(),
  transform: vi.fn(),
  beginPath: vi.fn(),
  closePath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  fill: vi.fn(),
}

// @ts-expect-error: canvas getContext is not fully implemented in jsdom
HTMLCanvasElement.prototype.getContext = vi.fn(() => mockContext2D)
