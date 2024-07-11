import { router } from 'expo-router';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    bottomTab: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#333',
        height: 75,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        paddingBottom: 20,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    tabButtonText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

interface BottomTabProps {
    onRestart?: () => void;
    onUndo?: () => void;
    onCopyPGN?: () => void;
    moveNumber?: number;
    simplified?: boolean;
}

const BottomTab: React.FC<BottomTabProps> = ({ onRestart, onUndo, onCopyPGN, moveNumber, simplified }) => {
    return (
        <View style={styles.bottomTab}>
            <TouchableOpacity style={styles.tabButton} onPress={() => router.back()}>
                <Icon name="exit-to-app" size={30} color="white" />
                <Text style={styles.tabButtonText}>Exit</Text>
            </TouchableOpacity>
            {!simplified && (
                <>
                
                    <TouchableOpacity style={styles.tabButton} onPress={onCopyPGN}>
                        <Icon name="content-copy" size={30} color="white" />
                        <Text style={styles.tabButtonText}>Copy PGN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabButton}>
                        <Text style={{
                            color: 'white',
                            fontSize: 22,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-SemiBold',
                        }}>{moveNumber}</Text>
                        <Text style={styles.tabButtonText}>Move Number</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabButton} onPress={onUndo}>
                        <Icon name="arrow-back" size={30} color="white" />
                        <Text style={styles.tabButtonText}>Undo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabButton} onPress={onRestart}>
                        <Icon name="refresh" size={30} color="white" />
                        <Text style={styles.tabButtonText}>Restart</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default BottomTab;
