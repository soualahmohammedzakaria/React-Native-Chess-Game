import Board from '@/components/Board'
import { SettingsContext } from '@/utils/SettingsContext'
import { playStartSound } from '@/utils/soundsPlayer'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { StyleSheet, View } from 'react-native'

export default function Chess() {
	const context = useContext(SettingsContext)
	if (!context) throw new Error('Settings must be used within a SettingsProvider')
	const { isSoundEnabled } = context

	playStartSound(isSoundEnabled)

	return (
		<>
			<View style={styles.container}>
				<Board />
			</View>
			<StatusBar style="auto" />
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#242320',
	},
})
