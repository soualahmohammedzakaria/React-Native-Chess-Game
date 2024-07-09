import { Dimensions } from "react-native";
const { width: screenWidth } = Dimensions.get('window');

export const colors = {
	BoardWhite: '#f0dab5',
	BoardBlack: '#b38664',
	PieceHeld: '#aba23b'
}

export const sizes = {
	screenWidth: screenWidth,
	square: screenWidth/8
}