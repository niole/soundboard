import React from 'react';
import { Button as ReactNativeButton } from 'react-native';

export const AdaptedButton: React.FC<{ children: string; onClick: () => void }> = props => (
    <ReactNativeButton onPress={props.onClick} title={props.children} />
);
