export type AssetType = 'sample' | 'loop' | 'midi' | 'stem' | 'preset';

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  verified?: boolean;
}

export interface AudioAsset {
  id: string;
  title: string;
  description?: string;
  type: AssetType;
  url: string;
  duration?: number;
  bpm?: number;
  key?: string;
  tags: string[];
  creator: User;
  createdAt: Date;
  likes: number;
  downloads: number;
  waveform?: number[];
}

export interface Pack {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  assets: AudioAsset[];
  creator: User;
  createdAt: Date;
  likes: number;
  downloads: number;
  tags: string[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  assets: AudioAsset[];
  creator: User;
  createdAt: Date;
  isPublic: boolean;
}
