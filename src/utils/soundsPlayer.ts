import { Chess } from "chess.js";
import { Audio } from "expo-av";
import { SettingsContext } from '@/utils/SettingsContext';
import { useContext } from "react";

export const playMoveSound = async (engine: Chess, move: any) => {
    const context = useContext(SettingsContext);
    if (!context)  throw new Error('Settings must be used within a SettingsProvider');
    if(context.isSoundEnabled) {
        if(engine.isGameOver()){
            const { sound: gameOver } = await Audio.Sound.createAsync(require("@/assets/sounds/gameover.mp3"));
            gameOver.playAsync()  
        }
        else if(engine.isCheck()){
            const { sound: check } = await Audio.Sound.createAsync(require("@/assets/sounds/check.mp3"));
            check.playAsync()
        }
        else if(move.flags.includes('k') || move.flags.includes('q')){
            const { sound: castle } = await Audio.Sound.createAsync(require("@/assets/sounds/castle.mp3"));
            castle.playAsync()
        }else if(move.flags.includes('c')){
            const { sound: capture } = await Audio.Sound.createAsync(require("@/assets/sounds/capture.mp3"));
            capture.playAsync()
        } else{
            const { sound: movePlayed } = await Audio.Sound.createAsync(require("@/assets/sounds/move.mp3"));
            movePlayed.playAsync()
        }
    }
}

export const playIllegalMoveSound = async () => {
    const context = useContext(SettingsContext);
    if (!context)  throw new Error('Settings must be used within a SettingsProvider');
    if(context.isSoundEnabled) {
        const { sound: illegalMove } = await Audio.Sound.createAsync(require("@/assets/sounds/illegal.mp3"));
        illegalMove.playAsync()
    }
}

export const playStartSound = async () => {
    const context = useContext(SettingsContext);
    if (!context)  throw new Error('Settings must be used within a SettingsProvider');
    if(context.isSoundEnabled) {
        const { sound: start } = await Audio.Sound.createAsync(require("@/assets/sounds/start.mp3"));
        start.playAsync()
    }
}