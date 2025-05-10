import { createContext, useState, useContext, ReactNode } from 'react';
import { Track } from '../types/music';

interface PlayerContextType {
  currentTrack: Track | null;
  setCurrentTrack: (track: Track | null) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        isPlaying,
        togglePlay,
        volume,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};