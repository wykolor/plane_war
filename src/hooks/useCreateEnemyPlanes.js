import { reactive } from "@vue/runtime-core";

export function useCreateEnemyPlanes() {
  const enemyPlanes = reactive([
    {
      x: 50, 
      y: 0,
      width: 308,
      height: 207
    }
  ])

  return { enemyPlanes }
}