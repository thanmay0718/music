import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Heart, Maximize2 } from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';

const Player = () => {
  const [volume, setVolume] = useState(80);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const { currentTrack } = usePlayer();

  // For demo purposes
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    setDuration(240); // 4 minutes in seconds for demo
  }, [currentTrack]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = ((e.clientX - rect.left) / rect.width) * 100;
      setProgress(Math.min(100, Math.max(0, percent)));
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] h-20 px-4 z-50">
      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between">
        {/* Current Track */}
        <div className="flex items-center flex-1 max-w-[30%]">
          {currentTrack ? (
            <>
              <div className="h-14 w-14 mr-3 rounded overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Album cover" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mr-4">
                <div className="text-white text-sm font-medium truncate">
                  Blinding Lights
                </div>
                <div className="text-[#b3b3b3] text-xs truncate">
                  The Weeknd
                </div>
              </div>
              <button className="text-[#b3b3b3] hover:text-white">
                <Heart size={16} />
              </button>
            </>
          ) : (
            <div className="text-[#b3b3b3] text-sm">
              Choose a track to play
            </div>
          )}
        </div>
        
        {/* Player Controls */}
        <div className="flex flex-col items-center max-w-[40%] w-full">
          <div className="flex items-center gap-4 mb-2">
            <button className="text-[#b3b3b3] hover:text-white">
              <Shuffle size={16} />
            </button>
            <button className="text-[#b3b3b3] hover:text-white">
              <SkipBack size={16} />
            </button>
            <button 
              className="bg-white rounded-full p-2 text-black hover:scale-105 transition"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button className="text-[#b3b3b3] hover:text-white">
              <SkipForward size={16} />
            </button>
            <button className="text-[#b3b3b3] hover:text-white">
              <Repeat size={16} />
            </button>
          </div>
          
          <div className="flex items-center w-full gap-2">
            <div className="text-xs text-[#b3b3b3] min-w-[40px] text-right">
              {formatTime((progress / 100) * duration)}
            </div>
            <div 
              ref={progressRef}
              className="h-1 flex-1 bg-[#535353] rounded-full overflow-hidden cursor-pointer relative"
              onClick={handleProgressClick}
            >
              <div 
                className="absolute top-0 left-0 h-full bg-[#b3b3b3] hover:bg-[#1DB954] rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-[#b3b3b3] min-w-[40px]">
              {formatTime(duration)}
            </div>
          </div>
        </div>
        
        {/* Volume Controls */}
        <div className="flex items-center gap-3 flex-1 justify-end max-w-[30%]">
          <button className="text-[#b3b3b3] hover:text-white">
            <Volume2 size={20} />
          </button>
          <div className="w-24 h-1 bg-[#535353] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#b3b3b3] hover:bg-[#1DB954] rounded-full"
              style={{ width: `${volume}%` }}
            ></div>
          </div>
          <button className="text-[#b3b3b3] hover:text-white">
            <Maximize2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;