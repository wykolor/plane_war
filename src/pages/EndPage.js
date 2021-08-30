import { defineComponent, h } from '@vue/runtime-core'
import endPageImg from '../assets/end_page.jpg'

import restartBtnImg from "../assets/restartBtn.png";

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
      h('Sprite', { texture: endPageImg }),
      h('Sprite', { 
        texture: restartBtnImg,
        x: 226,
        y: 516,
        interactive: true, // pixi 开启互
        onClick: ctx.onClick
      })
    ])
  }
})