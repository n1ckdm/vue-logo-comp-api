<template>
  <div>
    <svg id="svg" width="600" height="600" viewBox="-200 -200 600 600">
      {{outerParticles}}{{innerParticles}}
      <circle
        v-for="point in outerParticles.getParticles()"
        :key="`${point}${point.pos[0]}outer`"
        :cx="point.pos[0]"
        :cy="point.pos[1]"
        :r="pSize"
        fill="#42b883"
      />
      <circle
        v-for="point in innerParticles.getParticles()"
        :key="`${point}${point.pos[0]}inner`"
        :cx="point.pos[0]"
        :cy="point.pos[1]"
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
