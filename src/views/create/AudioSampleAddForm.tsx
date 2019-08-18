import * as React from 'react';
import { TextInput, Text, View } from 'react-native';
import { GeneralComponent } from 'super-layouts/dist/types';
import { ValidatedForm, PluggableInput } from '../../components/ValidatedForm';
import { AdaptedButton as Button } from '../../components/AdaptedButton';
import { Audio } from './types';

type AllValues = {
    title?: string;
    location?: string;
};
type Props = {
    onAddAudio: (newAudio: Audio) => Promise<void>;
    SoundGetterComponent: PluggableInput<string, string, AllValues>;
};

export const AudioSampleAddForm: React.FC<Props> = ({
    onAddAudio,
    SoundGetterComponent,
}) => (
    <ValidatedForm
        ActionsContainer={View}
        inputs={[
            [{
                key: 'title',
                validator: (value: string) => !value ? 'Please provide a title' : undefined,
                Input: ({ onChange, value }) => (
                    <TextInput
                        onChangeText={onChange}
                        value={value}
                        placeholder="Name your sound byte"
                    />
                ),
            }], [{
                key: 'location',
                validator: (location?: string) => !location ? 'Please get a sound' : undefined,
                Input: ({ onChange, value }) => (
                    <View>
                        <SoundGetterComponent
                            onChange={onChange}
                            value={value}
                        />
                        <Text>{value}</Text>
                    </View>
                ),
            }]
        ]}
        onSubmit={onAddAudio}
        submitLabel="Add Audio"
        cancelLabel="Clear"
        defaultValues={{}}
    />
);
