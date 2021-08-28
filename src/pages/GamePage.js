import { defineComponent, h } from '@vue/runtime-core';
import { useCreateEnemyPlanes, useCreatePlane, useCreateBullets, useFighting } from "../hooks";


import Map from "../components/Map";
import Plane from "../components/Plane";
import EnemyPlane from "../components/EnemyPlane";
import Bullet from "../components/Bullet";

export default defineComponent({
  setup(props, { emit }) {
    // 我方飞机
    const { planeInfo } = useCreatePlane();

    // 敌方飞机
    const { enemyPlanes, addEnemyPlane } = useCreateEnemyPlanes();

    // addEnemyPlane 待优化
    setInterval(() => {
      addEnemyPlane({x: Math.random() * 100, y: Math.random() * 100})
    }, 100);

    // 我方子弹
    const { bullets, addBullet } = useCreateBullets();
    // 发射子弹
    const onAttack = (bulletInfo) => {
      addBullet(bulletInfo)
    }

    // 战斗逻辑
    useFighting(enemyPlanes, bullets, planeInfo, emit )
    
    return {
      planeInfo,
      enemyPlanes,
      bullets,
      onAttack
    }
  },
  render(ctx) {
    // 创建敌军飞机
    const createEnemyPlanes = () => {
      return ctx.enemyPlanes.map(info => h(EnemyPlane, { x: info.x, y: info.y }))
    }

    // 创建我军子弹
    const createBullets = () => {
      return ctx.bullets.map(info => h(Bullet, { x: info.x, y: info.y }))
    }

    return h('Container', [
      h(Map),
      h(Plane, { x: ctx.planeInfo.x, y: ctx.planeInfo.y, onAttack: ctx.onAttack }),
      ...createEnemyPlanes(),
      ...createBullets()
    ])
  }
})