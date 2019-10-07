import { ref, onMounted, onUnmounted } from '@vue/composition-api';

export function useMousePosition() {
  const x = ref(200);
  const y = ref(200);

  function update(e: MouseEvent) {
    const ele: HTMLElement = document.getElementById('svg') as HTMLElement;
    x.value = e.pageX - ele.getBoundingClientRect().left - 200;
    y.value = e.pageY - ele.getBoundingClientRect().top - 200;
  }

  onMounted(() => {
    window.addEventListener('mousemove', update);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', update);
  });

  return { x, y };
}
