import React from 'react';
import { Button, View, Text } from 'react-native';
import { withDataFetcher } from 'super-layouts/dist/containers/withDataFetcher'
import CardDrilldownLayout from 'super-layouts/dist/layouts/CardDrilldownLayout'
import SoundBoardCard from '../../components/SoundBoardCard';
import SoundBoardService from '../../services/SoundBoardService';
import { SoundBoard } from '../../domain';

const getCardKey = (soundboard: SoundBoard): string  => soundboard.id;

const PreviewPanel: React.FC<{
    entity?: { title: string };
    togglePanel: () => void;
    showPanel: boolean;
}> = ({ entity, togglePanel, showPanel }) => (
    showPanel ? (
    <View>
        <Button title="Toggle" onPress={togglePanel} />
        {entity &&(
            <Text>
                Viewing {entity.title}
            </Text>
        )}
    </View>
    ) : null
);

type Props = {
    boards: SoundBoard[];
    navigators: {
        Create: (ps: Props) => void;
        Home: (ps: Props) => void;
    }
};

const HomeView: React.FC<Props> = ({ boards }) => (
    boards.length ? (
    <CardDrilldownLayout
        getCardKey={getCardKey}
        PreviewPanel={PreviewPanel}
        Card={SoundBoardCard}
        MainContentLayout={View}
        entities={boards}
    />
    ) : <Text>You have no sound boards</Text>
);

export default withDataFetcher(
    async (props: Props) => SoundBoardService.getSoundBoards('fakeCreatorId')
    .then((boards) => ({
        ...props,
        boards,
    }))
)(HomeView, <Text>Loading...</Text>);
