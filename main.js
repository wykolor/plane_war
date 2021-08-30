import { createApp } from './src/runtime-canvas'

import { getRootContainer } from './src/Game'

import App from './src/App'

// 需要根组件
// 根容器
createApp(App).mount(getRootContainer())