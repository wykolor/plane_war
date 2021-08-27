
import { createRenderer } from '@vue/runtime-core';

const renderer = createRenderer({
  createElement(type) {
    console.log(type);
  },

  // insert(el, parent) {
  //   console.log(el)
  //   console.log(parent);
  // }
});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}