
import { createRenderer } from '@vue/runtime-core';
import { Text, Graphics, Container, Sprite, Texture } from 'pixi.js'

const renderer = createRenderer({
  // 创建元素
  createElement(type) {
    let element;
    switch (type) {
      case "Container": 
        element = new Container()
        break;
      case "Sprite": 
        element = new Sprite()
        break;
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
    switch (key) {
      // pixi 针对图片的路径属性 texture 的特殊处理
      case "texture": 
        el.texture = Texture.from(nextValue)
        break;
      case "onClick": 
        el.on("pointertap", nextValue)
        break;
      default:
        el[key] = nextValue
    }
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