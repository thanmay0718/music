import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Playlist } from '../../types/music';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  return (
    <Link 
      to={`/playlist/${playlist.id}`} 
      className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all group cursor-pointer block"
    >
      <div className="relative mb-4">
        <img 
          src={playlist.imageUrl} 
          alt={playlist.name} 
          className="w-full aspect-square object-cover shadow-lg rounded"
        />
        <button 
          className="absolute right-2 bottom-2 bg-[#1DB954] rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg"
        >
          <Play size={18} fill="black" className="text-black ml-0.5" />
        </button>
      </div>
      <h3 className="text-white font-medium truncate">{playlist.name}</h3>
      <p className="text-[#b3b3b3] text-sm truncate">By {playlist.owner}</p>
    </Link>
  );
};

export default PlaylistCard;