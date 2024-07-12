import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { PIECES } from '@/constants/pieces';

const styles = StyleSheet.create({
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
        gap: 20,
        width: '100%',
    },
    pieceButton: {
        alignItems: 'center',
    },
    pieceImage: {
        width: 50,
        height: 50,
    },
});

interface PromotionModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSelect: (piece: string) => void;
    player: 'w' | 'b';
}

const Promotion = ({ isVisible, onClose, onSelect, player }: PromotionModalProps) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Promote to:</Text>
                    <View style={styles.modalButton}>
                        {(['q', 'r', 'b', 'n'] as const).map((type) => (
                            <TouchableOpacity
                                key={type}
                                onPress={() => onSelect(type)}
                                style={styles.pieceButton}
                                activeOpacity={0.7}
                            >
                                <Image
                                    source={PIECES[`${player}${type}`]}
                                    style={styles.pieceImage}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default Promotion;