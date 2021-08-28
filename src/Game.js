import { Application } from "pixi.js";

// setup canvas
const game = new Application({
  width: 750,
  height: 880
})

document.body.append(game.view)

// game.stage
export function getRootContainer() {
  return game.stage
}