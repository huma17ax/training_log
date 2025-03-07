<script setup lang="ts">
import { ref } from 'vue'
import RunningTab from '@/components/tabs/RunningTab.vue'
import LegPressTab from '@/components/tabs/LegPressTab.vue'
import ChestPressTab from '@/components/tabs/ChestPressTab.vue'
import LatPulldownTab from '@/components/tabs/LatPulldownTab.vue'
import AbdominalTab from '@/components/tabs/AbdominalTab.vue'
import type { TrainingType } from '@/stores/trainingStore'

const activeTab = ref<TrainingType>('running')

const tabs = [
  { id: 'running', label: 'ランニング' },
  { id: 'legPress', label: 'レッグプレス' },
  { id: 'chestPress', label: 'チェストプレス' },
  { id: 'latPulldown', label: 'ラットプルダウン' },
  { id: 'abdominal', label: 'アブドミナル' },
]

const setActiveTab = (tab: TrainingType) => {
  activeTab.value = tab
}
</script>

<template>
  <div class="training-tabs">
    <div class="tabs-header">
      <div class="tab-buttons">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
          @click="setActiveTab(tab.id as TrainingType)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="tab-content">
      <RunningTab v-if="activeTab === 'running'" />
      <LegPressTab v-else-if="activeTab === 'legPress'" />
      <ChestPressTab v-else-if="activeTab === 'chestPress'" />
      <LatPulldownTab v-else-if="activeTab === 'latPulldown'" />
      <AbdominalTab v-else-if="activeTab === 'abdominal'" />
    </div>
  </div>
</template>

<style scoped>
.training-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  overflow: hidden;
}

.tabs-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab-buttons {
  display: flex;
  overflow-x: auto;
  background-color: rgba(255, 255, 255, 0.1);
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  padding: 0.25rem;
  gap: 0.25rem;
}

.tab-buttons::-webkit-scrollbar {
  display: none;
}

.tab-button {
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;
  position: relative;
  flex: 0 0 auto;
  border-radius: 4px;
}

.tab-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: white;
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: center;
}

.tab-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.tab-button.active {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: bold;
}

.tab-button.active::after {
  transform: scaleX(0.8);
}

.tabs-header::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 24px;
  background: linear-gradient(to left, var(--primary-color) 0%, transparent 100%);
  pointer-events: none;
  opacity: 0.8;
}

.tab-content {
  padding: 0.75rem;
  flex: 1;
}

@media (max-width: 375px) {
  .tab-buttons {
    padding: 0.2rem;
    gap: 0.2rem;
  }

  .tab-button {
    padding: 0.6rem 0.75rem;
    font-size: 0.85rem;
    min-height: 40px;
  }

  .tab-content {
    padding: 0.5rem 0.25rem;
  }

  .tabs-header::after {
    width: 16px;
  }
}
</style>
