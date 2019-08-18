import React from 'react';
import { TextInput, Text, View } from 'react-native';
import SoundBoardService from '../../services/SoundBoardService';
import { ValidatedForm } from '../../components/ValidatedForm';
import { Tabs } from '../../components/Tabs';
import { AdaptedButton as Button } from '../../components/AdaptedButton';
import { Toolbar, toolbarStyles } from '../../components/Toolbar';
import AudioRecorder from './AudioRecorder';
import { AudioSampleAddForm } from './AudioSampleAddForm';
import { Audio } from './types';

const handleAddAudio = (currentUrls: Audio[], onChange: (urls: Audio[]) => void) => async (newAudio: Audio) => {
    onChange([...currentUrls, newAudio]);
};

const onSubmit = (creatorId: string) => async ({ soundBoardName, soundUrls }: Data): Promise<any> => {
    if (soundBoardName) {
        return SoundBoardService.createSoundboard(soundBoardName, creatorId, soundUrls);
    } else {
        throw new Error('Must provide a soundboard name');
    }
}

type Data = {
    soundUrls: Audio[];
    soundBoardName?: string;
};

export type Props = {
    creatorId: string;
};

const CreateView: React.FC<Props> = ({ creatorId }) => (
    <ValidatedForm
        inputs={[
            [{
                key: 'soundBoardName',
                validator: (value: string) => !value ? 'Please provide a name for your soundboard' : undefined,
                Input: ({
                    onChange,
                    value,
                }) => (
                    <TextInput
                        onChangeText={onChange}
                        value={value}
                        placeholder="Name your soundboard"
                    />
                ),
            }], [{
                key: 'soundUrls',
                validator: (soundUrls: Audio[]) => !soundUrls.length ? 'Please add sounds' : undefined,
                Input: ({
                    onChange,
                    value,
                }) => (
                    <View>
                        <Tabs
                            activeKey="record"
                            layoutProps={{}}
                            layouts={[{
                                layoutKey: 'record',
                                View: () => (
                                    <AudioSampleAddForm
                                        onAddAudio={handleAddAudio(value, onChange)}
                                        SoundGetterComponent={recordingAddProps => (
                                            <AudioRecorder
                                                onChange={recordingAddProps.onChange}
                                                value={recordingAddProps.value}
                                            />
                                        )}
                                    />
                                ),
                                title: 'Record',
                            }, {
                                layoutKey: 'upload',
                                View: () => (
                                    <AudioSampleAddForm
                                        onAddAudio={handleAddAudio(value, onChange)}
                                        SoundGetterComponent={recordingAddProps => (
                                            <Text>upload please</Text>
                                        )}
                                    />
                                ),
                                title: 'Upload',
                            }]}
                        />
                        {value.map(({ title, location }) => (
                            <View key={title}>
                                <Text>{title}</Text>
                                <Text>{location}</Text>
                            </View>
                        ))}
                    </View>
                ),
            }]
        ]}
        submitLabel="Create Soundboard"
        onSubmit={onSubmit(creatorId)}
        defaultValues={{ soundUrls: [] }}
        hideCancel={true}
    />
);

export default CreateView;
