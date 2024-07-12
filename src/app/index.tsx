import { colors } from '@/constants/tokens';
import { SettingsContext } from '@/utils/SettingsContext';
import { router } from 'expo-router';
import { useContext } from 'react';
import { BackHandler, StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Chess() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('Settings must be used within a SettingsProvider');
  const { isDarkThemeEnabled } = context;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#242320",
      alignItems: 'center',
      justifyContent: 'center',
      gap: 15,
    },
    button: {
      backgroundColor: isDarkThemeEnabled ? colors.DarkBoardBlack : colors.LightBoardWhite,
      borderRadius: 10,
      minHeight: 62,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: '80%',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Poppins-SemiBold',
    },
  });

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
    </SafeAreaView>
  );
};
