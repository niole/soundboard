import React from 'react';
import { View } from 'react-native';
import { Button as ElementButton, Text, Card, ListItem, Input as TextInput } from 'react-native-elements';
import SoundBoardService from '../../services/SoundBoardService';
import {
    ValidatedForm,
    Tabs,
    Section,
    Container,
} from '../../components';
import { Props as AdaptedButtonProps, AdaptedButton as Button } from '../../components/AdaptedButton';
import { Toolbar, toolbarStyles } from '../../components/Toolbar';
import AudioRecorder from './AudioRecorder';
import { AudioSampleAddForm } from './AudioSampleAddForm';
import { Audio } from './types';

const SubmitSoundboardButton: React.FC<AdaptedButtonProps> = props => (
    <Section>
        <ElementButton onPress={props.onClick} title={props.children} />
    </Section>
);

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
    <Container>
        <ValidatedForm
            inputs={[
                [{
                    key: 'soundBoardName',
                    validator: (value: string) => !value ? 'Please provide a name for your soundboard' : undefined,
                        Input: ({
                        onChange,
                        value,
                    }) => (
                    <Section>
                        <TextInput
                            label="Soundboard Name"
                            onChangeText={onChange}
                            value={value}
                            placeholder="Name your new soundboard"
                        />
                    </Section>
                    ),
                }], [{
                    key: 'soundUrls',
                    validator: (soundUrls: Audio[]) => !soundUrls.length ? 'Please add sounds' : undefined,
                        Input: ({
                        onChange,
                        value,
                    }) => (
                    <Section>
                        <>
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
                                <ListItem
                                    key={title}
                                    title={title}
                                    subtitle={location}
                                    bottomDivider={true}
                                />
                            ))}
                        </>
                    </Section>
                    ),
                }]
            ]}
            submitLabel="Create Soundboard"
            onSubmit={onSubmit(creatorId)}
            CustomSubmitButton={SubmitSoundboardButton}
            CustomActionBar={View}
            defaultValues={{ soundUrls: [] }}
            hideCancel={true}
        />
    </Container>
);

export default CreateView;
