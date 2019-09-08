import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export const style = StyleSheet.create({
    view: {
        margin: 12,
    },
});

export type Props = {
    children?: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => (
    <View style={style.view}>
        {children}
    </View>
);

export default Container;

