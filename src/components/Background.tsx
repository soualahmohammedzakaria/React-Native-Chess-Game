import React from 'react';
import { View } from 'react-native';
import Row from '@/components/Row';

export const Background = () => {
    return (
        <View style={{ flex: 1 }}>
            {
                new Array(8).fill(0).map((_, row) => (
                    <Row key={row} row={row} />
                ))
            }
        </View>
    )
}

export default Background;

