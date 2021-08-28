import { defineComponent, h, reactive, watch, toRefs } from "@vue/runtime-core";

import planeImg from "../assets/plane.png";

export default defineComponent({
  props: ["x", "y"],
  setup(props, ctx) {
    // props是一个只读的响应式对象s
    // 方法一 响应式丢失问题
    // const point = reactive({x: props.x, y: props.y })
    // watch(props, (value) => {
    //   point.x = value.x;
    //   point.y = value.y;
    // })
    // return {
    //  point
    // }

    // 方法二 用toRefs 把响应式对象内部的属性全部转换为 ref
    const { x, y } = toRefs(props);

    return { x, y }
  },
  render(ctx) {
    return h("Container", [ h("Sprite", { texture: planeImg, x: ctx.x, y: ctx.y })] )
  },
})