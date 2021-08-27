import { Application } from "pixi.js";

const game = new Application({
  width: 750,
  height: 1080
})

console.log(game);

document.body.append(game.view)

// game.stage
export function getRootContainer() {
  return game.stage
}