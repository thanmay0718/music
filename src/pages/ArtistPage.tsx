import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, MoreHorizontal, Heart } from 'lucide-react';
import { getArtistById, getArtistTracks, getArtistAlbums } from '../services/musicService';
import { Artist, Track, Playlist } from '../types/music';
import TrackCard from '../components/ui/TrackCard';
import PlaylistCard from '../components/ui/PlaylistCard';

const ArtistPage = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Playlist[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (id) {
      getArtistById(id).then(setArtist);
      getArtistTracks(id).then(setTopTracks);
      getArtistAlbums(id).then(setAlbums);
    }
  }, [id]);

  if (!artist) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DB954]"></div>
      </div>
    );
  }

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="pb-20 fade-in">
      <div className="relative">
        <div className="h-80 bg-gradient-to-b from-[#1DB954] to-[#121212]">
          <div className="absolute inset-0 flex items-center px-8">
            <div className="flex items-end gap-6">
              <div className="w-52 h-52 rounded-full overflow-hidden shadow-2xl">
                <img 
                  src={artist.imageUrl} 
                  alt={artist.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium uppercase text-white mb-4">Artist</p>
                <h1 className="text-6xl font-bold text-white mb-6">{artist.name}</h1>
                <p className="text-white text-lg">10.5M monthly listeners</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 mt-6">
        <div className="flex items-center gap-6 mb-8">
          <button 
            className="bg-[#1DB954] rounded-full p-3 text-black hover:bg-opacity-80 transition"
          >
            <Play size={24} fill="black" />
          </button>
          <button 
            onClick={toggleFollow}
            className={`border ${isFollowing ? 'border-[#1DB954] text-[#1DB954]' : 'border-[#727272] text-white'} rounded-full px-4 py-1 text-sm font-medium hover:border-white hover:scale-105 transition`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          <button className="text-[#b3b3b3] hover:text-white">
            <MoreHorizontal size={24} />
          </button>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Popular</h2>
          <div className="space-y-2">
            {topTracks.slice(0, 5).map((track, index) => (
              <div 
                key={track.id} 
                className="flex items-center p-2 rounded-md hover:bg-[#282828] group cursor-pointer"
              >
                <div className="w-8 text-center text-[#b3b3b3] mr-4">{index + 1}</div>
                <div className="w-10 h-10 mr-4">
                  <img 
                    src={track.albumImageUrl} 
                    alt={track.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{track.title}</h3>
                  <p className="text-[#b3b3b3] text-sm">{track.plays} plays</p>
                </div>
                <div className="text-[#b3b3b3] text-sm">
                  {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                </div>
                <button className="ml-4 opacity-0 group-hover:opacity-100 text-[#b3b3b3] hover:text-white">
                  <Heart size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Discography</h2>
          <div className="flex items-center space-x-4 mb-6">
            <button className="bg-[#282828] px-4 py-1 rounded-full text-white text-sm font-medium">
              Popular releases
            </button>
            <button className="bg-transparent px-4 py-1 rounded-full text-[#b3b3b3] text-sm font-medium hover:text-white">
              Albums
            </button>
            <button className="bg-transparent px-4 py-1 rounded-full text-[#b3b3b3] text-sm font-medium hover:text-white">
              Singles and EPs
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {albums.map((album) => (
              <PlaylistCard key={album.id} playlist={album} />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Fans also like</h2>
            <a href="#" className="text-sm text-[#b3b3b3] hover:underline">
              See all
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
            {/* This would be populated with similar artists from the API */}
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all group cursor-pointer">
                <div className="relative mb-4">
                  <img 
                    src={`https://images.pexels.com/photos/167${i}700/pexels-photo-167${i}700.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`} 
                    alt={`Similar Artist ${i}`} 
                    className="w-full aspect-square object-cover shadow-lg rounded-full"
                  />
                </div>
                <h3 className="text-white font-medium text-center">Similar Artist {i}</h3>
                <p className="text-[#b3b3b3] text-sm text-center">Artist</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArtistPage;