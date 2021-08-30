## 

# Vue3 Canvas Pixi.js 实现飞机大战游戏

# 自定义渲染器 渲染到Canvas平台上

# 熟悉 Vue3 特性

- composition API
  

# 重点逻辑思路

## 地图滚动效果 -- 移动 Y 值 轮询

1. 渲染两张地图组件 第一张 地图的初始值 Y=0 第二张 地图的初始值 Y = - viewHeight
2. 两张图分别进行 Y ++ 
3. 判断 当某张地图的 Y 坐标 大于等于 viewHeight 时 将该地图的 Y 坐标设置为 -viewHeight
4. 循环 步骤 3

```javascript
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
```

## 我军飞机移动 -- 监听上下左右 按键 改变 横纵坐标

```javascript
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
```

## 敌军飞机 移动  

- 在主循环中 将飞机的 纵坐标下移 y++

## 我军子弹移动 且 子弹发射坐标需与我军飞机坐标一致

- 在飞机组件中监听键盘 空格 事件 ，向子弹列表添加一枚子弹，该颗子弹的横纵坐标取飞机此时的横纵坐标
- 在主循环中 将子弹的纵坐标上移 y--


## 碰撞检测 --- 矩形检测

- 因产生碰撞的时机不可控，采用反向思维，找出不会发生碰撞的时机，然后取反即可
  
### 检测逻辑 

> 下面四种情况是不会产生碰撞的情况，取反即发生碰撞

```javascript
  export const hitTextObject = (objA, objB) => {
    return !(
      objA.x + objA.width < objB.x ||
      objB.x + objB.width < objA.x || 
      objA.y + objA.height < objB.y ||
      objB.y + objB.height < objA.y
    )
  }
```

### 碰撞情况

- 我军飞机与敌军飞机碰撞  则 游戏失败 退出游戏
- 我军子弹与敌军飞机碰撞 则 该子弹和 该敌军飞机消失 ---- 主要的战斗逻辑
- 敌军子弹碰撞我方飞机 则游戏失败 退出游戏

```javascript
  // 碰撞检测
  // 我方飞机和敌方飞机的碰撞检测
  enemyPlanes.forEach(enemyInfo => {
    if(hitTextObject(enemyInfo, planeInfo)) {
      // 游戏结束
      emit("changePage", "EndPage")
    }
  })

  // 我方子弹和敌方飞机的碰撞
  enemyPlanes.forEach((enemyInfo, enemyIndex) => {
    bullets.forEach((bulletInfo, bulletIndex) => {
      if(hitTextObject(enemyInfo, bulletInfo)) {
        // 我方子弹和敌军飞机消失
        bullets.splice(bulletIndex, 1);
        enemyPlanes.splice(enemyIndex, 1);
      }
    })
  })
```

## 注意事项

- 在游戏结束时，需清除 主循环 避免内存泄漏 以及 逻辑有误


## 难点 1 移动丝滑处理 & 同时按键的处理

- 建立一个按键队列
- 按到上下左右键就往队列里面添加，如果按键队列已经存在即将要添加的按键 ，则删除队列的键，添加入新的键
  

## 难点 2 敌军飞机随机左右移动， 随机添加


## 难点 3 敌军子弹

