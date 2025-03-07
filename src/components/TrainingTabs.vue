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
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.tab-buttons::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.tab-button {
  padding: 0.8rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.tab-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.tab-button.active {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: bold;
}

.tab-content {
  padding: 1rem;
  flex: 1;
}

@media (max-width: 600px) {
  .tab-button {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
  }
}
</style>
