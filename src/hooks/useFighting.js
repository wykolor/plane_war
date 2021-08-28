import { onMounted, onUnmounted } from "@vue/runtime-core";
import { game } from "../Game";
import { hitTextObject } from "../utils";

export function useFighting(enemyPlanes, bullets, planeInfo, emit ) {
  const handleTicker = () => {
    // 主循环

    // 敌军飞机移动
    enemyPlanes.forEach((enemyInfo) => {
      enemyInfo.y ++
    })

    // 移动我方子弹
    bullets.forEach((bulletInfo) => {
      bulletInfo.y --
    })

    // 碰撞检测
    // 我方飞机和敌方飞机的碰撞检测
    enemyPlanes.forEach(enemyInfo => {
      if(hitTextObject(enemyInfo, planeInfo)) {
        // 游戏结束
        emit("changePage", "EndPage")
      }
    })

    // 我方子弹和敌方飞机的碰撞
    enemyPlanes.forEach((enemyInfo, enemyIndex) => {
      bullets.forEach((bulletInfo, bulletIndex) => {
        if(hitTextObject(enemyInfo, bulletInfo)) {
          // 我方子弹和敌军飞机消失
          bullets.splice(bulletIndex, 1);
          enemyPlanes.splice(enemyIndex, 1);
        }
      })
    })
  }

  onMounted(() => {
    game.ticker.add(handleTicker)
  })

  onUnmounted(() => {
    game.ticker.remove(handleTicker)
  })
}