import { defineComponent, h, onMounted, onUnmounted } from '@vue/runtime-core';
import { useCreateEnemyPlanes, useCreatePlane } from "../hooks";
import { game } from "../Game";
import { hitTextObject } from "../utils";

import Map from "../components/Map";
import Plane from "../components/Plane";
import EnemyPlane from "../components/EnemyPlane";
import Bullet from "../components/Bullet";

export default defineComponent({
  setup(props, { emit }) {
    // 我方飞机
    const { planeInfo } = useCreatePlane();

    // 敌方飞机
    const { enemyPlanes } = useCreateEnemyPlanes();

    // 我方子弹

    const 
    
    const handleTicker = () => {
      // 主循环

      // 敌军飞机移动
      enemyPlanes.forEach((enemyInfo) => {
        enemyInfo.y ++
      })

      // 碰撞检测
      enemyPlanes.forEach(enemyInfo => {
        if(hitTextObject(enemyInfo, planeInfo)) {
          // console.log('hit');
          // 游戏结束
          emit("changePage", "EndPage")
        }
      })
    }

    onMounted(() => {
      game.ticker.add(handleTicker)
    })

    onUnmounted(() => {
      game.ticker.remove(handleTicker)
    })
  
    return {
      planeInfo,
      enemyPlanes
    }
  },
  render(ctx) {
    // 创建敌军飞机
    const createEnemyPlanes = () => {
      return ctx.enemyPlanes.map(info => h(EnemyPlane, { x: info.x, y: info.y }))
    }
    return h('Container', [
      h(Map),
      h(Plane, { x: ctx.planeInfo.x, y: ctx.planeInfo.y }),
      ...createEnemyPlanes()
    ])
  }
})