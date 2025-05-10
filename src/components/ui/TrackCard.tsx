import { Play } from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';
import { Track } from '../../types/music';

interface TrackCardProps {
  track: Track;
}

const TrackCard = ({ track }: TrackCardProps) => {
  const { setCurrentTrack } = usePlayer();

  const handlePlay = () => {
    setCurrentTrack(track);
  };

  return (
    <div 
      className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all group cursor-pointer"
      onClick={handlePlay}
    >
      <div className="relative mb-4">
        <img 
          src={track.albumImageUrl} 
          alt={track.title} 
          className="w-full aspect-square object-cover shadow-lg rounded"
        />
        <button 
          className="absolute right-2 bottom-2 bg-[#1DB954] rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg"
          onClick={handlePlay}
        >
          <Play size={18} fill="black" className="text-black ml-0.5" />
        </button>
      </div>
      <h3 className="text-white font-medium truncate">{track.title}</h3>
      <p className="text-[#b3b3b3] text-sm truncate">{track.artist}</p>
    </div>
  );
};

export default TrackCard;