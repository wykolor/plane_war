import { reactive } from "@vue/runtime-core";

export function useCreateEnemyPlanes() {
  const enemyPlanes = reactive([])

  const addEnemyPlane = (info) => {
    enemyPlanes.push({ ...info, width: 308, height: 207 })
  }

  return { enemyPlanes, addEnemyPlane }
}