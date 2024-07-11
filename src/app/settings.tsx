// Settings.tsx
import React, { useContext, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsContext } from '@/utils/SettingsContext';
import { colors } from '@/constants/tokens';
import BottomTab from '@/components/BottomTab';

export default function Settings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('Settings must be used within a SettingsProvider');
  }

  const { isSoundEnabled, setIsSoundEnabled, isFlipPiecesEnabled, setIsFlipPiecesEnabled, isDarkThemeEnabled, setIsDarkThemeEnabled } = context;

  const toggleSoundSwitch = () => setIsSoundEnabled(previousState => !previousState);
  const toggleFlipPiecesSwitch = () => setIsFlipPiecesEnabled(previousState => !previousState);
  const toggleThemeSwitch = () => setIsDarkThemeEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settings}>
        <View>
          <View style={styles.row}> 
            <Text style={styles.label}>Sound</Text>
            <Switch
              trackColor={{ false: "#767577", true: isDarkThemeEnabled ? colors.DarkBoardBlack : colors.LightBoardWhite }}
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
              trackColor={{ false: "#767577", true: isDarkThemeEnabled ? colors.DarkBoardBlack : colors.LightBoardWhite }}
              thumbColor="#f4f3f4"
              onValueChange={toggleFlipPiecesSwitch}
              value={isFlipPiecesEnabled}
            />
          </View>
          <Text style={styles.muted}>Automatically rotate the board to face the player</Text>
        </View>
        <View>
          <View style={styles.row}>
            <Text style={styles.label}>Dark Theme</Text>
            <Switch
              trackColor={{ false: "#767577", true: isDarkThemeEnabled ? colors.DarkBoardBlack : colors.LightBoardWhite }}
              thumbColor="#f4f3f4"
              onValueChange={toggleThemeSwitch}
              value={isDarkThemeEnabled}
            />
          </View>
          <Text style={styles.muted}>Switch between Dark and Light themes</Text>
        </View>
      </View>
      <BottomTab simplified={true} />
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242320",
  },
  settings: {
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
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  muted: {
    color: '#ccc',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
});