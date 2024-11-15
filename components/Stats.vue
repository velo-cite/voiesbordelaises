<template>
  <div class="grid grid-cols-2 rounded-lg overflow-hidden shadow bg-gray-200 gap-px " :class="dynamicColumnsClass">
    <div v-for="item in stats" :key="item.name" class="px-4 py-5 sm:p-6 bg-white">
      <div class="flex justify-between">
        <div class="text-base font-normal text-gray-900">
          {{ item.name }}
        </div>
        <div class="text-sm" :class="item.class">
          {{ displayPercent(item.percent) }}
        </div>
      </div>
      <div class="mt-1 flex justify-between items-baseline md:block lg:flex">
        <div class="flex items-baseline text-2xl" :class="item.class">
          {{ displayDistanceInKm(item.distance, precision) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Geojson } from '~/types';
const { getStats, displayDistanceInKm, displayPercent } = useStats();

const { voies, precision } = defineProps<{
  voies: Geojson[];
  precision?: number;
}>();

const stats = getStats(voies);
const columnsCount = Object.keys(stats).length;
const dynamicColumnsClass = {
  'md:grid-cols-1': columnsCount === 1,
  'md:grid-cols-2': columnsCount === 2,
  'md:grid-cols-3': columnsCount === 3,
  'md:grid-cols-4': columnsCount === 4,
  'md:grid-cols-5': columnsCount === 5
};
</script>
