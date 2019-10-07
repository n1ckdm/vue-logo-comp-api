import { ref, onMounted } from '@vue/composition-api';
import PolygonPoints from '@/polygon-points';
import { useMousePosition } from './useMousePosition';

export function useParticles(updateInterval: number) {

  const inner = new PolygonPoints([
    [39, 0],
    [98, 102],
    [157, 0],
    [121, 0],
    [98, 40],
    [75, 0],
  ], 30);

  const outer = new PolygonPoints([
    [0, 0],
    [98, 170],
    [196, 0],
    [157, 0],
    [98, 102],
    [39, 0],
  ], 40);

  const innerParticles = ref(inner.getParticles());
  const outerParticles = ref(outer.getParticles());

  const {x, y} = useMousePosition();

  onMounted(() => {
    setInterval(() => {
      inner.update([x.value, y.value]);
      outer.update([x.value, y.value]);
      innerParticles.value = inner.getParticles();
      outerParticles.value = outer.getParticles();
    }, updateInterval);
  });

  return {innerParticles, outerParticles};

}
