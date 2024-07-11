import React, { useCallback, useContext, useState } from "react";
import { View, StyleSheet, Text, Alert, Modal, TouchableOpacity } from "react-native";
import { sizes } from "@/constants/tokens";
import Background from '@/components/Background';
import Piece from "@/components/Piece";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useStore } from "@/hooks/useStore";
import { calculateMaterialAdvantage } from "@/utils/materielAdvantage";
import { playStartSound } from "@/utils/soundsPlayer";
import { SettingsContext } from "@/utils/SettingsContext";
import BottomTab from "@/components/BottomTab";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Chess } from "chess.js";
import { router } from "expo-router";

const Board = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('Settings must be used within a SettingsProvider');
    const { isSoundEnabled } = context;

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
        },
        modalBackground: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
        },
        modalContent: {
            backgroundColor: '#242320',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
        },
        modalText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
        },
        modalButton: {
            flexDirection: 'row',
            gap: 60,
            width: '100%',
        },
    });

    const chess = useStore(() => new Chess());
    const [play, setPlay] = useState({
        player: 'w',
        board: chess.board()
    });
    const [isModalVisible, setModalVisible] = useState(false);
    const [gameResult, setGameResult] = useState('');

    const onTurn = useCallback(() => {
      if (chess.isGameOver()) {
         if (chess.isCheckmate()) {
            setGameResult(`${play.player === 'w' ? 'White' : 'Black'} won by Checkmate`);
         } else if (chess.isDraw()) {
            setGameResult('Draw');
         } else if (chess.isStalemate()) {
            setGameResult('Draw by Stalemate');
         } else if (chess.isThreefoldRepetition()) {
            setGameResult('Draw by Threefold Repetition');
         } else if (chess.isInsufficientMaterial()) {
            setGameResult('Draw by Insufficient Material');
         }
         setModalVisible(true);   
      }
      setPlay({
         player: play.player === 'w' ? 'b' : 'w',
         board: chess.board()
      });
    }, [chess, play.player]);

    const handleRestart = () => {
        playStartSound(isSoundEnabled);
        chess.reset();
        setPlay({
            player: 'w',
            board: chess.board()
        });
    };

    const handleUndo = () => {
        if (chess.moveNumber() === 1 && chess.turn() === 'w') return;
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

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{gameResult}</Text>
                        <View style={styles.modalButton}>
                            <TouchableOpacity onPress={() => { router.back() }} activeOpacity={0.7}>
                              <Icon name="exit-to-app" size={30} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {handleRestart(); setModalVisible(false);}} activeOpacity={0.7}>
                              <Icon name="refresh" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </GestureHandlerRootView>
    );
}

export default Board;