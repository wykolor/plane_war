import { defineComponent, h, ref } from "@vue/runtime-core";

import { game } from "../Game";

import mapImg from "../assets/map.jpg";

export default defineComponent({
  setup(props, ctx) {
    const viewHeight = 1080;
    const mapY1 = ref(0);
    const mapY2 = ref(-viewHeight);
    const speed = 5;
    // 循环借助 pixi 的 ticker 类似于 setInterval
    game.ticker.add(() => {
      mapY1.value += speed;
      mapY2.value += speed;

      if (mapY1.value >= viewHeight) {
        mapY1.value = -viewHeight
      }

      if (mapY2.value >= viewHeight) {
        mapY2.value = -viewHeight
      }
    })
    // pixi 事件轮训 ticker
    return {
      mapY1,
      mapY2
    }
  },
  render(ctx) {
    return h("Container", [
      h("Sprite", { texture: mapImg, y: ctx.mapY1 }),
      h("Sprite", { texture: mapImg, y: ctx.mapY2 })
    ])
  },
})