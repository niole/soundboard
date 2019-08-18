import shortid from 'shortid';
import { Audio, SoundBoard, Sound } from '../domain';

let sounds: Sound[] = [];
let soundBoards: SoundBoard[] = [
  {
      creatorId: 'fakeCreatorId',
      id: 'fakeid',
      title: 'faketitle',
      createdAt: new Date(),
  }
];

export interface SoundBoardService {
  getSoundBoards: (creatorId: string) => Promise<SoundBoard[]>;

  getSoundboardSounds: (soundboardId: string) => Promise<Sound[]>;

  createSoundboard: (title: string, creatorId: string, sounds?: Audio[]) => Promise<SoundBoard>;

  updateSoundboardTitle: (newTitle: string, soundBoardId: string) => Promise<SoundBoard | void>;

  removeSoundboard: (soundBoardId: string) => Promise<void>;

  addSoundToSoundboard: (newTitle: string, location: string, soundBoardId: string) => Promise<Sound>;

  removeSoundFromSoundboard: (soundId: string) => Promise<void>;

  updateSoundTitle: (newTitle: string, soundId: string) => Promise<Sound | void>;

  updateSoundLocation: (newLocation: string, soundId: string) => Promise<Sound | void>;

}

const DefaultSoundboardService: SoundBoardService = {
  getSoundBoards: async (creatorId: string) => {
    return soundBoards.filter((board: SoundBoard) => board.creatorId === creatorId);
  },

  getSoundboardSounds: async (soundboardId: string) => {
    return sounds.filter((sound: Sound) => sound.soundBoardId === soundboardId);
  },

  createSoundboard: async (title: string, creatorId: string, newSounds?: Audio[]) => {
    const newSoundBoard = {
      creatorId,
      id: shortid.generate(),
      title,
      createdAt: new Date(),
    };

    if (newSounds) {
      newSounds.forEach(({ location, title }: Audio) => {
        sounds.push({
          soundBoardId: newSoundBoard.id,
          id: shortid.generate(),
          location,
          title,
        });
      });
    }

    soundBoards.push(newSoundBoard);

    return newSoundBoard;
  },

  updateSoundboardTitle: async (newTitle: string, soundBoardId: string) => {
    for (let i=0; i < soundBoards.length; i++) {
      const board = soundBoards[i];
      if (board.id === soundBoardId) {
        soundBoards[i] = {
          ...board,
          title: newTitle
        };

        return soundBoards[i];
      }
    }
  },

  removeSoundboard: async (soundBoardId: string) => {
    soundBoards = soundBoards.filter((board: SoundBoard) => board.id !== soundBoardId);
  },

  addSoundToSoundboard: async (newTitle: string, location: string, soundBoardId: string) => {
    const newSound = {
      soundBoardId,
      id: shortid.generate(),
      location,
      title: newTitle
    };

    sounds.push(newSound);
    return newSound;
  },

  removeSoundFromSoundboard: async (soundId: string) => {
    sounds = sounds.filter((sound: Sound) => sound.id !== soundId);
  },

  updateSoundTitle: async (newTitle: string, soundId: string) => {
    for (let i=0; i < sounds.length; i++) {
      const board = sounds[i];
      if (board.id === soundId) {
        sounds[i] = {
          ...board,
          title: newTitle
        };

        return sounds[i];
      }
    }
  },

  updateSoundLocation: async (newLocation: string, soundId: string) => {
    for (let i=0; i < sounds.length; i++) {
      const board = sounds[i];
      if (board.id === soundId) {
        sounds[i] = {
          ...board,
          location: newLocation,
        };

        return sounds[i];
      }
    }
  },

};

export default DefaultSoundboardService;
