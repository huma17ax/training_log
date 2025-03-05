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
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        @click="setActiveTab(tab.id as TrainingType)"
      >
        {{ tab.label }}
      </button>
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
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tabs-header {
  display: flex;
  overflow-x: auto;
  background-color: #f8f8f8;
  border-bottom: 1px solid var(--border-color);
}

.tab-button {
  padding: 0.8rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.9rem;
  color: #666;
  transition: all 0.3s ease;
}

.tab-button:hover {
  background-color: #eee;
}

.tab-button.active {
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  font-weight: bold;
}

.tab-content {
  padding: 1rem;
}

@media (max-width: 600px) {
  .tabs-header {
    justify-content: flex-start;
  }

  .tab-button {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
  }
}
</style>
