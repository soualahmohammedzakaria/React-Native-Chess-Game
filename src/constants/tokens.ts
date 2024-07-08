import { Dimensions } from "react-native";
const { width: screenWidth } = Dimensions.get('window');

export const colors = {
	BoardWhite: '#648544',
	BoardBlack: '#E6E9C6',
	PieceHeld: '#ffff0080'
}

export const sizes = {
	screenWidth: screenWidth,
	square: screenWidth/8
}