import { Chess, Square } from "chess.js";
import { Audio } from "expo-av";
import { toPosition, toTranslation } from "@/utils/translation";
import { colors, sizes } from "@/constants/tokens";
import React, { useCallback } from "react";
import { StyleSheet, Image } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Vector } from "react-native-redash";

type Player = "b" | "w";
type Type = "q" | "r" | "n" | "b" | "k" | "p";
type Piece = `${Player}${Type}`;
type Pieces = Record<Piece, ReturnType<typeof require>>;
export const PIECES: Pieces = {
    br: require("@/assets/pieces/br.png"),
    bp: require("@/assets/pieces/bp.png"),
    bn: require("@/assets/pieces/bn.png"),
    bb: require("@/assets/pieces/bb.png"),
    bq: require("@/assets/pieces/bq.png"),
    bk: require("@/assets/pieces/bk.png"),
    wr: require("@/assets/pieces/wr.png"),
    wn: require("@/assets/pieces/wn.png"),
    wb: require("@/assets/pieces/wb.png"),
    wq: require("@/assets/pieces/wq.png"),
    wk: require("@/assets/pieces/wk.png"),
    wp: require("@/assets/pieces/wp.png"),
}

interface PieceProps {
    key: string;
    engine: Chess;
    piece: Piece;
    position: Vector;
    onTurn: () => void;
    enabled: boolean;
}

const Piece = ({ engine, piece, position, onTurn, enabled }: PieceProps) => {  
    


    const isActive = useSharedValue(false);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const translateX = useSharedValue(position.x);
    const translateY = useSharedValue(position.y);

    const movePiece = useCallback(async (from: Square, to: Square) => {
        
        /*const { sound: movePlayed } = await Audio.Sound.createAsync(require("@/assets/sounds/move.mp3"));
        const { sound: capture } = await Audio.Sound.createAsync(require("@/assets/sounds/capture.mp3"));
        const { sound: castle } = await Audio.Sound.createAsync(require("@/assets/sounds/castle.mp3"));
        
        */


        const move = engine.moves({ verbose: true }).find(move => move.from === from && move.to === to)
        const { x, y } = toTranslation(move ? to : from)
        translateX.value = withTiming(x)
        translateY.value = withTiming(y, {}, () => isActive.value = false)
        if(move) {
            engine.move(move)
            onTurn()
            if(engine.isGameOver()){
                const { sound: gameOver } = await Audio.Sound.createAsync(require("@/assets/sounds/gameover.mp3"));
                gameOver.playAsync()  
            }
            else if(engine.isCheck()){
                const { sound: check } = await Audio.Sound.createAsync(require("@/assets/sounds/check.mp3"));
                check.playAsync()
            }
        }else{
            const { sound: illegalMove } = await Audio.Sound.createAsync(require("@/assets/sounds/illegal.mp3"));
            illegalMove.playAsync()
        }
    }, [engine, translateX, translateY, onTurn, isActive, offsetX, offsetY])

    const onPieceMoving = useAnimatedGestureHandler({
        onStart: () => {
            isActive.value = true
            offsetX.value = translateX.value
            offsetY.value = translateY.value
        },
        onActive: ({ translationX, translationY }) => {
            translateX.value = offsetX.value + translationX
            translateY.value = offsetY.value + translationY
        },
        onEnd: () => {   
            const from = toPosition({ x: offsetX.value, y: offsetY.value })
            const to = toPosition({ x: translateX.value, y: translateY.value })
            runOnJS(movePiece)(from, to)
        }
    })

    const animatedStyle = useAnimatedStyle(() => ({
        position: "absolute",
        zIndex: isActive.value ? 100 : 10, 
        width: sizes.square,
        height: sizes.square,
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }))

    const source = useAnimatedStyle(() => {
        return {
            backgroundColor: colors.PieceHeld,
            opacity: isActive.value ? 1 : 0,
            position: "absolute",
            zIndex: isActive.value ? 100 : 10, 
            width: sizes.square,
            height: sizes.square,
            transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
        }
    })

    const destination = useAnimatedStyle(() => {
        const transl = toTranslation(toPosition({ x: translateX.value, y: translateY.value }))
        return {
            backgroundColor: colors.PieceHeld,
            opacity: isActive.value ? 1 : 0,
            position: "absolute",
            zIndex: isActive.value ? 100 : 10, 
            width: sizes.square,
            height: sizes.square,
            transform: [{ translateX: transl.x }, { translateY: transl.y }],
        }
    })
    
    const style = StyleSheet.create({
        sprite: {
          width: sizes.square,
          height: sizes.square,
        }
    })

    return (
        <>     
            <Animated.View style={destination} />
            <Animated.View style={source} />
            <PanGestureHandler onGestureEvent={onPieceMoving} enabled={enabled}>
                <Animated.View style={animatedStyle}>
                    <Image source={PIECES[piece]} style={style.sprite} />
                </Animated.View>
            </PanGestureHandler>   
        </>
    );
}

export default Piece

