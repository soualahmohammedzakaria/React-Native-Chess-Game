import { colors } from '@/constants/tokens';
import { router } from 'expo-router';
import { BackHandler, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Chess() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push('/game')}
        activeOpacity={0.7}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push('/settings')}
        activeOpacity={0.7}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => BackHandler.exitApp()}
        activeOpacity={0.7}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Exit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242320",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  button: {
    backgroundColor: colors.BoardBlack,
    borderRadius: 10,
    minHeight: 62,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  buttonText: {
    color: colors.BoardWhite,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
});
