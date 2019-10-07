<template>
  <div>
    <svg width="400" height="400">
      <circle
        v-for="point in outerParticles"
        :key="`${point[0]}${point[1]}`"
        :cx="point[0]"
        :cy="point[1]"
        :r="pSize"
        fill="#42b883"
      />
      <circle
        v-for="point in innerParticles"
        :key="`${point[0]}${point[1]}`"
        :cx="point[0]"
        :cy="point[1]"
        :r="pSize"
        fill="#35495e"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { useMousePosition } from '@/compositions/useMousePosition';
import { useParticles } from '@/compositions/useParticles';
import PolygonPoints from '@/polygon-points';

export default Vue.extend({
  setup() {
    const { innerParticles, outerParticles } = useParticles(100);
    const pSize = 6;

    return {
      innerParticles,
      outerParticles,
      pSize,
    };
  },
});
</script>
