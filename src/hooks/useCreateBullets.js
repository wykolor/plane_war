import { reactive } from "@vue/runtime-core";

export function useCreateBullets() {
  const bullets = reactive([])

  const addBullet = (info) => {
    bullets.push({...info, width: 61, height: 99 })
  }

  return {
    bullets,
    addBullet
  }
}