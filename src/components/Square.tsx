import { View, Text } from "react-native";
import { RowProps } from "@/components/Row";
import { colors } from "@/constants/tokens";

interface SquareProps extends RowProps{
    col: number;
}

const Square = ({ row, col }: SquareProps) => {
    const offset = 1 - (row % 2);
    const numsOpacity = col === 0 ? 1 : 0;
    const lettersOpacity = row === 7 ? 1 : 0;
    const bgColor = (col + offset) % 2 === 0 ? colors.BoardWhite : colors.BoardBlack;
    const labelsColor = (col + offset) % 2 === 0 ? colors.BoardBlack : colors.BoardWhite;
    
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