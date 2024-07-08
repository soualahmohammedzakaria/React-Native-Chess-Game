import { View } from "react-native";
import Square from '@/components/Square';

export interface RowProps {
    row: number;
}

const Row = ({ row }: RowProps) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            {
                new Array(8).fill(0).map((_, col) => (
                    <Square row={row} col={col} key={col} />
                ))
            }
        </View>
    )
}

export default Row;