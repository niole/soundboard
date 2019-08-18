import React from 'react';
import { StyleSheet, View } from 'react-native';

export const toolbarStyles = StyleSheet.create({
    actionBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        flex: 1,
        position: 'relative'
    },
});

export const Toolbar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <View style={toolbarStyles.actionBar}>
        {children}
    </View>
);
