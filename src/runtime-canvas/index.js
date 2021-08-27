
import { createRenderer } from '@vue/runtime-core';
import { Text, Graphics } from 'pixi.js'

const renderer = createRenderer({
  // 创建元素
  createElement(type) {
    let element;
    if (type === "rect") {
      // 创建一个矩形
      element = new Graphics();
      element.beginFill(0xff0000);
      element.drawRect(0, 0, 500, 500);
      element.endFill();
    } else if (type === "circle") {
      // 创建一个圆
      element = new Graphics();
      element.beginFill(0xff00ff);
      element.drawCircle(0, 0, 100);
      element.endFill()
    }

    return element
  },

  // // 添加节点
  insert(el, parent) {
    parent.addChild(el)
  },

  setElementText(node, text) {
    const cText = new Text(text);
    node.addChild(cText);
  },

  createText(text) {
    return new Text(text)
  },

  patchProp(el, key, preValue, nextValue) {
    el[key] = nextValue
  },

  // 处理注释
  createComment() {},

  // 获取父节点
  parentNode() {},

  // 获取兄弟节点
  nextSibling() {},

  // 删除节点时调用
  remove(el) {
    const parent = el.parent;
    if(parent) {
      parent.removeChild(el);
    }
  }

});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}