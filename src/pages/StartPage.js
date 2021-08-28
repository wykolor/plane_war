import { defineComponent, h } from '@vue/runtime-core'
import startPageImg from '../assets/start_page.jpg'

import startBtnImg from "../assets/startBtn.png";

export default defineComponent({
  setup( props, { emit }) {
    // vue3 的入口函数 
    // 没有this
    const onClick = () => {
      emit("changePage", "GamePage")
    }

    return {
      onClick
    }
  },
  render(ctx) {
    // 背景图片
    return h('Container', [
      h('Sprite', { texture: startPageImg }),
      h('Sprite', { 
        texture: startBtnImg,
        x: 226,
        y: 516,
        interactive: true, // pixi 开启互
        onClick: ctx.onClick
      })
    ])
  }
})