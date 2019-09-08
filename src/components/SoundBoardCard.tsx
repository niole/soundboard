import React from 'react';
import { Card, Button } from 'react-native-elements'

const SoundBoardCard: React.FC<{
  entity: { title: string; };
  onDrilldown: () => void;
}> = ({ onDrilldown, entity}) => (
  <Card title={entity.title}>
    <Button
      title="View"
      onPress={onDrilldown}
    />
  </Card>
);

export default SoundBoardCard;
