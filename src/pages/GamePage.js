import { defineComponent, h } from '@vue/runtime-core';
import Map from "../components/Map";
import Plane from "../components/Plane";

export default defineComponent({
  render() {
    // 背景图片
    return h('Container', [
      h(Map),
      h(Plane)
    ])
  }
})