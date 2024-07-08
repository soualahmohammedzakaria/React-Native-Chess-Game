import { View, StyleSheet } from "react-native";
import { sizes } from "@/constants/tokens";
import Background from '@/components/Background';
import { useCallback, useState } from "react";
import { Chess } from "chess.js";
import Piece from "@/components/Piece";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useStore } from "@/hooks/useStore";

const Board = () => {
   const styles = StyleSheet.create({
      container: {
         height: sizes.screenWidth,
         width: sizes.screenWidth,
      }
   })

   const chess = useStore(() => new Chess());
   const [play, setPlay] = useState({
      player: 'w',
      board: chess.board()
   })

   const onTurn = useCallback(() => setPlay({
      player: play.player === 'w' ? 'b' : 'w',
      board: chess.board()
   }), [chess, play.player])

   return (
      <GestureHandlerRootView style={styles.container}>
         <View style={styles.container}>
            
            <Background />
            {
               play.board.map((row, i) => row.map((square, j) => {
                  if(!square) return null
                  return (
                     <Piece enabled={play.player === square.color} onTurn={onTurn} key={`${i}${j}`} engine={chess} position={{ x: j*sizes.square, y: i*sizes.square}} piece={`${square.color}${square.type}`} />
                  )
               }))
            }
         </View>
      </GestureHandlerRootView>
   )
}

export default Board;