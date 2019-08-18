export type Sound = {
  soundBoardId: string;
  id: string;
  location: string;
  title: string;
};

export type SoundBoard = {
  creatorId: string;
  id: string;
  title: string;
  createdAt: Date;
};

export type Creator = {
  username: string;
  email: string;
  id: string
};

export type Audio = {
    location: string;
    title: string;
};
