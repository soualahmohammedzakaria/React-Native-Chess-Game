import Board from '@/components/Board';
import { playStartSound } from '@/utils/soundsPlayer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export default function Chess() {
  playStartSound();
  return (
    <>
      <View style={styles.container}>
        <Board />
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#242320",
  },
});
