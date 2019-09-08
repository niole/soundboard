import * as React from 'react';
import { View } from 'react-native';
import { Text, Input as TextInput } from 'react-native-elements';
import { GeneralComponent } from 'super-layouts/dist/types';
import {
    Section,
    ValidatedForm,
    PluggableInput,
    AdaptedButton as Button,
} from '../../components';
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
                    <Section>
                        <TextInput
                            label="New Sound Title"
                            onChangeText={onChange}
                            value={value}
                            placeholder="Name your sound byte"
                        />
                    </Section>
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
