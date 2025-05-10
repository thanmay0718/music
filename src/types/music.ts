export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  duration: number;
  dateAdded: string;
  plays?: number;
}

export interface Playlist {
  id: string;
  name: string;
  owner: string;
  description?: string;
  imageUrl: string;
  tracks: Track[];
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  followers?: number;
  genres?: string[];
}