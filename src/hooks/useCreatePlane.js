import { reactive } from "@vue/runtime-core";

export function useCreatePlane () {
  const planeInfo = reactive({ x: 226, y: 500, width: 258, height: 364 });
  const speed = 10;
  // 键盘控制飞机的移动
  window.addEventListener('keydown', e => {
    switch (e.code) {
      case "ArrowUp": 
        // 边界处理
        if (planeInfo.y <= 0) {
          planeInfo.y = 0
        }
        planeInfo.y -= speed
        break;
      case "ArrowDown": 
        // 边界处理
        if (planeInfo.y >= (1080 - 364)) {
          planeInfo.y = 1080 - 364
        }
        planeInfo.y += speed
        break;
      case "ArrowLeft": 
        if (planeInfo.x <= 0) {
          planeInfo.x = 0
        }
        planeInfo.x -= speed

        break;
      case "ArrowRight": 
        if (planeInfo.x >= (750 - 258)) {
          planeInfo.x = 750 - 258
        }
        planeInfo.x += speed
        break;
    }
  })

  return { planeInfo }
}