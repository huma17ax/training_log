<script setup lang="ts">
import { ref } from 'vue'
import RunningTab from '@/components/tabs/RunningTab.vue'
import LegPressTab from '@/components/tabs/LegPressTab.vue'
import ChestPressTab from '@/components/tabs/ChestPressTab.vue'
import LatPulldownTab from '@/components/tabs/LatPulldownTab.vue'
import AbdominalTab from '@/components/tabs/AbdominalTab.vue'
import type { TrainingType } from '@/stores/trainingStore'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

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

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch {
    // エラーはストアで処理されているため、ここでは何もしない
  }
}
</script>

<template>
  <div class="home-view">
    <main>
      <div class="training-tabs">
        <div class="tabs-header">
          <div class="header-content">
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
            <button
              class="logout-button"
              @click="handleLogout"
              :disabled="authStore.loading"
              :title="authStore.loading ? 'ログアウト中...' : 'ログアウト'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
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
    </main>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  width: 100%;
  max-width: 100%;
  margin: 0;
}

.training-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;
  border-radius: 0;
  box-shadow: none;
  padding-top: var(--header-height, 60px);
}

.tabs-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  height: var(--header-height, 60px);
}

.header-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.5rem;
  gap: 0.5rem;
}

.user-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.user-name {
  font-weight: 500;
  color: white;
}

.logout-button {
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 36px;
  margin-top: 0.25rem;
}

.logout-button:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.tab-buttons {
  flex: 1;
  display: flex;
  overflow-x: auto;
  background-color: rgba(255, 255, 255, 0.1);
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  padding: 0.25rem;
  gap: 0.25rem;
  border-radius: 4px;
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

.tab-content {
  padding: 0.75rem;
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - var(--header-height, 60px));
  width: 100%;
}

@media (max-width: 375px) {
  main {
    padding: 0;
  }

  .header-content {
    padding: 0.25rem;
    gap: 0.25rem;
  }

  .user-controls {
    padding: 0.25rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .user-info {
    justify-content: center;
  }

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
}
</style>
