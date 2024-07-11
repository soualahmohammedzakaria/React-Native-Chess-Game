import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

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
        gap: 60,
        width: '100%',
    },
});

interface GameOverProps {
    isVisible: boolean;
    onClose: () => void;
    onRestart: () => void;
    gameResult: string;
}

const GameOver = ({ isVisible, onClose, onRestart, gameResult } : GameOverProps) => {
    const router = useRouter();

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{gameResult}</Text>
                    <View style={styles.modalButton}>
                        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                            <Icon name="exit-to-app" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { onRestart(); onClose(); }} activeOpacity={0.7}>
                            <Icon name="refresh" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default GameOver;
