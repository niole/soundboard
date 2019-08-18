import React from 'react';
import { Button, View, Text } from 'react-native';

const SoundBoardCard: React.FC<{
  entity: { title: string; };
  onDrilldown: () => void;
}> = ({ onDrilldown, entity}) => (
  <View>
    <Text>{entity.title}</Text>
    <Button
      title="View"
      onPress={onDrilldown}
    />
  </View>
);

export default SoundBoardCard;
