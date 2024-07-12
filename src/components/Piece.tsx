import { colors, sizes } from '@/constants/tokens';
import { SettingsContext } from '@/utils/SettingsContext';
import { playIllegalMoveSound, playMoveSound } from '@/utils/soundsPlayer';
import { toPosition, toTranslation } from '@/utils/translation';
import { Chess, Square } from 'chess.js';
import React, { useCallback, useContext, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { Vector } from 'react-native-redash';
import Promotion from '@/components/Promotion';
import { PIECES, Piece } from '@/constants/pieces';

interface PieceProps {
    key: string;
    engine: Chess;
    piece: Piece;
    position: Vector;
    onTurn: () => void;
    enabled: boolean;
}

const ChessPiece = ({ engine, piece, position, onTurn, enabled }: PieceProps) => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('Settings must be used within a SettingsProvider');
    const { isSoundEnabled, isFlipPiecesEnabled, isDarkThemeEnabled } = context;

    const isActive = useSharedValue(false);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const translateX = useSharedValue(position.x);
    const translateY = useSharedValue(position.y);

    const [isPromotionModalVisible, setPromotionModalVisible] = useState(false);
    const [promotionSquare, setPromotionSquare] = useState<Square | null>(null);
    const [promotionFromSquare, setPromotionFromSquare] = useState<Square | null>(null);

    const movePiece = useCallback(
        async (from: Square, to: Square) => {
            const move = engine
                .moves({ verbose: true })
                .find((move) => move.from === from && move.to === to);
            const { x, y } = toTranslation(move ? to : from);
            translateX.value = withTiming(x);
            translateY.value = withTiming(y, {}, () => (isActive.value = false));
            if (move) {
                if (move.piece === 'p' && (move.to[1] === '8' || move.to[1] === '1')) {
                    setPromotionSquare(move.to);
                    setPromotionFromSquare(from);
                    setPromotionModalVisible(true);
                    return;
                }
                engine.move(move);
                onTurn();
                playMoveSound(engine, move, isSoundEnabled);
            } else {
                playIllegalMoveSound(isSoundEnabled);
            }
        },
        [engine, translateX, translateY, onTurn, isActive, offsetX, offsetY]
    );

    const handlePromotion = (piece: string) => {
        if (promotionSquare && promotionFromSquare) {
            const move = engine.move({ from: promotionFromSquare, to: promotionSquare, promotion: piece });
            setPromotionSquare(null);
            setPromotionFromSquare(null);
            setPromotionModalVisible(false);
            onTurn();
			playMoveSound(engine, move, isSoundEnabled);
        }
    };

    const onPieceMoving = useAnimatedGestureHandler({
        onStart: () => {
            isActive.value = true;
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;
        },
        onActive: ({ translationX, translationY }) => {
            translateX.value = offsetX.value + translationX;
            translateY.value = offsetY.value + translationY;
        },
        onEnd: () => {
            const from = toPosition({ x: offsetX.value, y: offsetY.value });
            const to = toPosition({ x: translateX.value, y: translateY.value });
            runOnJS(movePiece)(from, to);
        },
    });

    const animatedStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        zIndex: isActive.value ? 100 : 10,
        width: sizes.square,
        height: sizes.square,
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }));

    const source = useAnimatedStyle(() => {
        return {
            backgroundColor: isDarkThemeEnabled ? colors.DarkPieceHeld : colors.LightPieceHeld,
            opacity: isActive.value ? 1 : 0,
            position: 'absolute',
            zIndex: isActive.value ? 100 : 10,
            width: sizes.square,
            height: sizes.square,
            transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
        };
    });

    const destination = useAnimatedStyle(() => {
        const transl = toTranslation(toPosition({ x: translateX.value, y: translateY.value }));
        return {
            backgroundColor: isDarkThemeEnabled ? colors.DarkPieceHeld : colors.LightPieceHeld,
            opacity: isActive.value ? 1 : 0,
            position: 'absolute',
            zIndex: isActive.value ? 100 : 10,
            width: sizes.square,
            height: sizes.square,
            transform: [{ translateX: transl.x }, { translateY: transl.y }],
        };
    });

    const rot = isFlipPiecesEnabled
        ? engine.turn() === 'b'
            ? '180deg'
            : '0deg'
        : piece[0] === 'b'
        ? '180deg'
        : '0deg';

    const style = StyleSheet.create({
        sprite: {
            width: sizes.square,
            height: sizes.square,
            transform: [{ rotate: rot }],
        },
    });

    return (
        <>
            {/* Uncomment to highlight the FROM and TO squares
            <Animated.View style={destination} />
            <Animated.View style={source} />
            */}
            <PanGestureHandler onGestureEvent={onPieceMoving} enabled={enabled}>
                <Animated.View style={animatedStyle}>
                    <Image source={PIECES[piece]} style={style.sprite} />
                </Animated.View>
            </PanGestureHandler>
            {promotionSquare && (
                <Promotion
                    isVisible={isPromotionModalVisible}
                    onClose={() => setPromotionModalVisible(false)}
                    onSelect={handlePromotion}
                    player={piece[0] as 'w' | 'b'}
                />
            )}
        </>
    );
};

export default ChessPiece;