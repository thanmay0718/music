import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, MoreHorizontal, Play, Heart } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';
import { getPlaylistById } from '../services/musicService';
import { Playlist, Track } from '../types/music';

const PlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { setCurrentTrack } = usePlayer();

  useEffect(() => {
    if (id) {
      getPlaylistById(id).then(setPlaylist);
    }
  }, [id]);

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DB954]"></div>
      </div>
    );
  }

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="pb-20 fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-6">
        <div className="w-48 h-48 flex-shrink-0 shadow-lg">
          <img 
            src={playlist.imageUrl} 
            alt={playlist.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium uppercase text-white">Playlist</p>
          <h1 className="text-5xl font-bold text-white mt-2 mb-4">{playlist.name}</h1>
          <div className="flex items-center text-sm text-[#b3b3b3]">
            <span className="font-medium text-white">{playlist.owner}</span>
            <span className="mx-1">•</span>
            <span>{playlist.tracks.length} songs,</span>
            <span className="ml-1">about 3 hours</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-6 mb-6">
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

        <div className="bg-[#181818] bg-opacity-40 rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#282828] text-[#b3b3b3] text-sm">
                <th className="px-4 py-2 text-left w-12">#</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Album</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Date added</th>
                <th className="px-4 py-2 text-right"><Clock size={16} /></th>
                <th className="px-4 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {playlist.tracks.map((track, index) => (
                <tr 
                  key={track.id} 
                  className="text-[#b3b3b3] text-sm hover:bg-[#282828] group"
                  onDoubleClick={() => handlePlayTrack(track)}
                >
                  <td className="px-4 py-3 text-left">{index + 1}</td>
                  <td className="px-4 py-3 text-left">
                    <div className="flex items-center">
                      <div className="w-10 h-10 mr-3">
                        <img 
                          src={track.albumImageUrl} 
                          alt={track.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-white font-medium">{track.title}</div>
                        <div>{track.artist}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-left hidden md:table-cell">{track.album}</td>
                  <td className="px-4 py-3 text-left hidden md:table-cell">{track.dateAdded}</td>
                  <td className="px-4 py-3 text-right">{formatDuration(track.duration)}</td>
                  <td className="px-4 py-3">
                    <button className="opacity-0 group-hover:opacity-100 text-[#b3b3b3] hover:text-white">
                      <Heart size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;