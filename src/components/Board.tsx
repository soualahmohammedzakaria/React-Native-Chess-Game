import { View, StyleSheet, Text, Alert } from "react-native";
import { sizes } from "@/constants/tokens";
import Background from '@/components/Background';
import { useCallback, useContext, useState } from "react";
import { Chess } from "chess.js";
import Piece from "@/components/Piece";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useStore } from "@/hooks/useStore";
import { calculateMaterialAdvantage } from "@/utils/materielAdvantage";
import { playStartSound } from "@/utils/soundsPlayer";
import { SettingsContext } from "@/utils/SettingsContext";
import BottomTab from "@/components/BottomTab";
import Clipboard from 'expo-clipboard';

const Board = () => {
   const context = useContext(SettingsContext)
	if (!context) throw new Error('Settings must be used within a SettingsProvider')
	const { isSoundEnabled } = context

   const styles = StyleSheet.create({
      container: {
         flex: 1,
         justifyContent: 'center',
         backgroundColor: '#242320',
      },
      boardContainer: {
         height: sizes.screenWidth,
         width: sizes.screenWidth,
         marginVertical: 20,
      },
      player: {
         color: 'white',
         fontSize: 20,
         marginLeft: 10,
         fontFamily: 'Poppins-Medium',
         fontWeight: 'bold'
      },
      advantage: {
         color: '#ccc',
         fontSize: 15,
      }
   });

   const chess = useStore(() => new Chess());
   const [play, setPlay] = useState({
      player: 'w',
      board: chess.board()
   });

   const onTurn = useCallback(() => setPlay({
      player: play.player === 'w' ? 'b' : 'w',
      board: chess.board()
   }), [chess, play.player]);

   const handleRestart = () => {
      playStartSound(isSoundEnabled);
      chess.reset();
      setPlay({
         player: 'w',
         board: chess.board()
      });
   };

   const handleUndo = () => {
      if(chess.moveNumber() === 1 && chess.turn() === 'w') return;
      chess.undo();
      onTurn();
   };

   const handleCopyPGN = () => {
      const pgn = chess.pgn();
      if (!pgn) {
          Alert.alert('No PGN to copy');
          return;
      }
      //Clipboard.setString(pgn);
      Alert.alert('PGN copied to clipboard');
  };

   const materialAdvantage = calculateMaterialAdvantage(play.board);

   return (
         <GestureHandlerRootView style={styles.container}>
            <Text style={styles.player}>Black <Text style={styles.advantage}>{materialAdvantage < 0 && (`+${-materialAdvantage}`)}</Text></Text>
            <View style={styles.boardContainer}>
               <Background />
               {play.board.map((row, i) => row.map((square, j) => {
                  if (!square) return null;
                  return (
                     <Piece
                        enabled={play.player === square.color}
                        onTurn={onTurn}
                        key={`${i}${j}`}
                        engine={chess}
                        position={{ x: j * sizes.square, y: i * sizes.square }}
                        piece={`${square.color}${square.type}`}
                     />
                  );
               }))}
            </View>
            <Text style={styles.player}>White <Text style={styles.advantage}>{materialAdvantage > 0 && (`+${materialAdvantage}`)}</Text></Text>
            <BottomTab onRestart={handleRestart} onUndo={handleUndo} onCopyPGN={handleCopyPGN} moveNumber={chess.moveNumber()} simplified={false} />
         </GestureHandlerRootView>
   );
}

export default Board;