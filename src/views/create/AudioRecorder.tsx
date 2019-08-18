import React from 'react';
import { PermissionsAndroid, Button, View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import { Toolbar, toolbarStyles } from '../../components/Toolbar';

const DEFAULT_RECORDING_STATUS = {
    canRecord: false,
    durationMillis: 0,
    isDoneRecording: false,
    isRecording: false,
};

const playBackRecording = (
    setPlayback: (playback: Audio.Sound) => void, currentRecording?: Audio.Recording
) => async () => {
    if (currentRecording) {
        console.log('play');
        try {
            const recordingLocation = currentRecording.getURI()
            const info = await FileSystem.getInfoAsync(recordingLocation);
            const soundObject = new Audio.Sound();
            await soundObject.loadAsync(info);
            await soundObject.playAsync();
            setPlayback(soundObject);
        } catch (error) {
            console.log('error', error);
        }
    }
};

const stopPlayback = (soundObject: Audio.Sound) => async () => {
    console.log('stop playing');
    try {
        await soundObject.stopAsync();
    } catch (error) {
        console.log('error', error);
    }
};

const triggerRecordingStart = (currentRecording: Audio.Recording) => {
    currentRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
    .then((d: any) => {
        console.log('THIN', d);
        return currentRecording.startAsync();
    })
    .then((recording: any) => {
        console.log('you are recording now', recording);
    })
    .catch((error: any) => {
        console.log('couldnt start recording', error, JSON.stringify(error));
    });
};

const startRecording = (
    setRecordingStatus: (status: any) => void,
    setRecording: (recording: Audio.Recording) => void,
    currentRecording?: Audio.Recording,
) => () => {
    if (currentRecording) {
        console.log(currentRecording);
        triggerRecordingStart(currentRecording);
    } else {
        setupAudioAndRecording(setRecordingStatus, setRecording)
        .then((recording?: Audio.Recording) => {
            if (recording) {
                triggerRecordingStart(recording);
            } else {
                return Promise.reject('Recording did not exist after clearing and resetup');
            }
        })
        .catch((error: any) => {
            console.log('error: failed to clear and re-setup recording', error);
        });
    }
};

const stopRecording = (currentRecording: Audio.Recording, onChange: Props['onChange']) => () => {
    currentRecording.stopAndUnloadAsync().then(() => {
        onChange(currentRecording._uri);
    })
    .catch((error: any) => {
        console.log('couldnt stop recording', error);
    });
};

const resetRecording = (
    setRecording: (recording?: Audio.Recording) => void
) => () => {
    console.log('reset')
    setRecording(undefined);
};

const setupAudioAndRecording = (
    setRecordingStatus: (status: any) => void, setRecording: (recording: Audio.Recording) => void
): Promise<void | Audio.Recording> => {
    return Permissions.getAsync(Permissions.AUDIO_RECORDING).then((permissions: any) => {
        if (permissions.status !== 'granted') {
            if (permissions.status === 'undetermined') {
                return Permissions.askAsync(Permissions.AUDIO_RECORDING)
                .then(({ status, permissions }) => {
                    if (status === 'granted') {
                        return;
                    } else {
                        return Promise.reject('Audio recording permissions not enabled.');
                    }
                });
            } else {
                alert('Please enable audio permissions for this application.');
                return Promise.reject('Audio recording permissions not enabled.');
            }
        }
    })
    .then(() => {
        return Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            staysActiveInBackground: false,
            playThroughEarpieceAndroid: true,
        }).then(() => {
            console.log('go for it');
            const recording = new Audio.Recording();
            recording.setOnRecordingStatusUpdate((r: any) => {
                setRecordingStatus(r);
            });
            recording.setProgressUpdateInterval(200);
            setRecording(recording);
            return recording;
        });
    })
    .catch((error: any) => {
        console.log('oh no', error);
    });
};

type Props = {
    onChange: (url: string) => void;
    value?: string;
};

const AudioRecorder: React.FC<Props> = ({ onChange, value }) => {
    const [currentPlayback, setPlayback] = React.useState(undefined);
    const [currentRecording, setRecording] = React.useState(undefined);
    const [recordingStatus, setRecordingStatus] = React.useState(DEFAULT_RECORDING_STATUS);
    React.useEffect(() => {
        setupAudioAndRecording(setRecordingStatus, setRecording);
    }, []);
    React.useEffect(() => {
        if (!value && !currentRecording) {
            // clearing the value
            setRecording(undefined);
            setRecordingStatus(DEFAULT_RECORDING_STATUS);
            // re-ready a recording
            setupAudioAndRecording(setRecordingStatus, setRecording);
        }
    }, [value]);
    console.log('currentRecording', currentRecording);
    console.log('value', value);
    return (
        <View>
            <Text>recorder</Text>
            <Toolbar>
                <View style={toolbarStyles.button}>
                    <Button
                        title="Play"
                        onPress={playBackRecording(setPlayback, currentRecording)}
                    />
                </View>
                <View style={toolbarStyles.button}>
                    <Button
                        title="Stop Playback"
                        onPress={stopPlayback(currentPlayback)}
                    />
                </View>
                <View style={toolbarStyles.button}>
                    <Button
                        title="Start"
                        onPress={startRecording(setRecordingStatus, setRecording, currentRecording)}
                    />
                </View>
                <View style={toolbarStyles.button}>
                    <Button
                        title="Stop"
                        onPress={stopRecording(currentRecording, onChange)}
                    />
                </View>
                <View style={toolbarStyles.button}>
                    <Button
                        title="Clear"
                        onPress={resetRecording(setRecording)}
                    />
                </View>
            </Toolbar>
        </View>
    );
};
export default AudioRecorder;
