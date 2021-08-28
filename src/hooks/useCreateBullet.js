import { reactive } from "@vue/runtime-core";

export function useCreateBullet() {
  const bullets = reactive([
    {
      x: 50,
      y: 50
    }
  ])

  return {
    bullets
  }
}