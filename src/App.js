import { defineComponent, h, ref, computed } from "@vue/runtime-core";

import StartPage from "./pages/StartPage";

import GamePage from "./pages/GamePage";

export default defineComponent({
  setup() {
    const pageMap = new Map([["StartPage", StartPage], ["GamePage", GamePage]]);

    const currentPageName = ref("GamePage");

    console.log(currentPageName);

    const currentPage = computed(() => pageMap.get(currentPageName.value));

    return {
      currentPage,
      currentPageName
    }
  },
  render(ctx) {
    return h("Container", [
      h(ctx.currentPage, {
        onChangePage(page) {
          // 切换组件
          ctx.currentPageName = page
        }
      }),
    ])
  },
})                     
