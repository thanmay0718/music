import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Artist } from '../../types/music';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <Link 
      to={`/artist/${artist.id}`} 
      className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all group cursor-pointer block"
    >
      <div className="relative mb-4">
        <img 
          src={artist.imageUrl} 
          alt={artist.name} 
          className="w-full aspect-square object-cover shadow-lg rounded-full"
        />
        <button 
          className="absolute right-2 bottom-2 bg-[#1DB954] rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg"
        >
          <Play size={18} fill="black" className="text-black ml-0.5" />
        </button>
      </div>
      <h3 className="text-white font-medium truncate text-center">{artist.name}</h3>
      <p className="text-[#b3b3b3] text-sm truncate text-center">Artist</p>
    </Link>
  );
};

export default ArtistCard;