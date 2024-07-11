import { Dimensions } from "react-native";
const { width: screenWidth } = Dimensions.get('window');

export const colors = {
	LightBoardWhite: '#648544',
	LightBoardBlack: '#E6E9C6',
	LightPieceHeld: '#ffff0080',
	DarkBoardWhite: '#f0dab5',
	DarkBoardBlack: '#b38664',
	DarkPieceHeld: '#aba23b',
}

export const sizes = {
	screenWidth: screenWidth,
	square: screenWidth/8
}