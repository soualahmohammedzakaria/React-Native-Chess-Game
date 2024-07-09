// Settings.tsx
import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsContext } from '@/utils/SettingsContext';
import { colors } from '@/constants/tokens';

export default function Settings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('Settings must be used within a SettingsProvider');
  }

  const { isSoundEnabled, setIsSoundEnabled, isFlipPiecesEnabled, setIsFlipPiecesEnabled } = context;

  const toggleSoundSwitch = () => setIsSoundEnabled(previousState => !previousState);
  const toggleFlipPiecesSwitch = () => setIsFlipPiecesEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.row}> 
          <Text style={styles.label}>Sound</Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.BoardBlack }}
            thumbColor="#f4f3f4"
            onValueChange={toggleSoundSwitch}
            value={isSoundEnabled}
          />
        </View>
        <Text style={styles.muted}>Enable the game sounds</Text>
      </View>
      <View>
        <View style={styles.row}>
          <Text style={styles.label}>Flip Board</Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.BoardBlack }}
            thumbColor="#f4f3f4"
            onValueChange={toggleFlipPiecesSwitch}
            value={isFlipPiecesEnabled}
          />
        </View>
        <Text style={styles.muted}>Automatically rotate the board to face the player</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242320",
    padding: 20,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  muted: {
    color: '#ccc',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
});