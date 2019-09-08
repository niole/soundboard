import React from 'react';
import { Button as ReactNativeButton } from 'react-native-elements';

export type Props = {
    children: string;
    onClick: () => void;
};
export const AdaptedButton: React.FC<Props> = props => (
    <ReactNativeButton onPress={props.onClick} title={props.children} />
);
