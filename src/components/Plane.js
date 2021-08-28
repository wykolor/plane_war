import { defineComponent, h, ref} from "@vue/runtime-core";

import planeImg from "../assets/plane.png";

export default defineComponent({
  setup(props, ctx) {
    
  },
  render() {
    return h("Container", [ h("Sprite", { texture: planeImg, x: 220, y: 500 })] )
  },
})