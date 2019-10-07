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
  ], 20);

  const outer = new PolygonPoints([
    [0, 0],
    [98, 170],
    [196, 0],
    [157, 0],
    [98, 102],
    [39, 0],
  ], 30);

  const innerParticles = ref(inner);
  const outerParticles = ref(outer);

  const {x, y} = useMousePosition();

  onMounted(() => {
    setInterval(() => {
      inner.update([x.value, y.value]);
      outer.update([x.value, y.value]);
      innerParticles.value = inner;
      outerParticles.value = outer;
    }, updateInterval);
  });

  return {innerParticles, outerParticles};

}
