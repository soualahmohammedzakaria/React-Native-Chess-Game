import { View, Text } from "react-native";
import { RowProps } from "@/components/Row";
import { colors } from "@/constants/tokens";
import { SettingsContext } from "@/utils/SettingsContext";
import { useContext } from "react";

interface SquareProps extends RowProps{
    col: number;
}

const Square = ({ row, col }: SquareProps) => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('Settings must be used within a SettingsProvider');
    const { isDarkThemeEnabled } = context;
    
    const offset = 1 - (row % 2);
    const numsOpacity = col === 0 ? 1 : 0;
    const lettersOpacity = row === 7 ? 1 : 0;
    const bgColor = (col + offset) % 2 === 0 ? (isDarkThemeEnabled ? colors.DarkBoardWhite : colors.LightBoardWhite) : (isDarkThemeEnabled ? colors.DarkBoardBlack : colors.LightBoardBlack);
    const labelsColor = (col + offset) % 2 === 0 ? (isDarkThemeEnabled ? colors.DarkBoardBlack : colors.LightBoardBlack) : (isDarkThemeEnabled ? colors.DarkBoardWhite : colors.LightBoardWhite);
    
    return (
        <View
            style={
                {
                    flex: 1,
                    backgroundColor: bgColor,
                    padding: 2,
                    justifyContent: "space-between",

                }
            }
        >  
            <Text style={{ color: labelsColor, fontWeight: "600", fontSize: 11, opacity: numsOpacity }}>{8 - row}</Text>
            <Text style={{ color: labelsColor, fontWeight: "600", fontSize: 11, opacity: lettersOpacity, alignSelf: "flex-end" }}>{String.fromCharCode(col + 97)}</Text>
        </View>
    )
}

export default Square;