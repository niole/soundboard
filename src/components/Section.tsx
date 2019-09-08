import React from 'react';
import { StyleSheet, View } from 'react-native';

export const style = StyleSheet.create({
    view: {
        marginTop: 12,
        marginBottom: 12,
    },
});

export type Props = {
    children?: React.ReactNode;
};

const Section: React.FC<Props> = ({ children }) => (
    <View style={style.view}>
        {children}
    </View>
);

export default Section;
