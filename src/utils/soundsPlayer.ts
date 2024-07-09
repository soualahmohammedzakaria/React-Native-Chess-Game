import { Chess } from "chess.js";
import { Audio } from "expo-av";

export const playMoveSound = async (engine: Chess, move: any, isSoundEnabled: boolean) => {
  if (isSoundEnabled) {
    if (engine.isGameOver()) {
      const { sound: gameOver } = await Audio.Sound.createAsync(require("@/assets/sounds/gameover.mp3"));
      gameOver.playAsync();
    } else if (engine.isCheck()) {
      const { sound: check } = await Audio.Sound.createAsync(require("@/assets/sounds/check.mp3"));
      check.playAsync();
    } else if (move.flags.includes('k') || move.flags.includes('q')) {
      const { sound: castle } = await Audio.Sound.createAsync(require("@/assets/sounds/castle.mp3"));
      castle.playAsync();
    } else if (move.flags.includes('c')) {
      const { sound: capture } = await Audio.Sound.createAsync(require("@/assets/sounds/capture.mp3"));
      capture.playAsync();
    } else {
      const { sound: movePlayed } = await Audio.Sound.createAsync(require("@/assets/sounds/move.mp3"));
      movePlayed.playAsync();
    }
  }
}

export const playIllegalMoveSound = async (isSoundEnabled: boolean) => {
  if (isSoundEnabled) {
    const { sound: illegalMove } = await Audio.Sound.createAsync(require("@/assets/sounds/illegal.mp3"));
    illegalMove.playAsync();
  }
}

export const playStartSound = async (isSoundEnabled: boolean) => {
  if (isSoundEnabled) {
    const { sound: start } = await Audio.Sound.createAsync(require("@/assets/sounds/start.mp3"));
    start.playAsync();
  }
}