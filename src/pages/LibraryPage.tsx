import { useState, useEffect } from 'react';
import { Filter, Clock, GridIcon, ListIcon } from 'lucide-react';
import { getUserPlaylists, getUserLikedSongs } from '../services/musicService';
import { Playlist, Track } from '../types/music';
import PlaylistCard from '../components/ui/PlaylistCard';
import TrackCard from '../components/ui/TrackCard';

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState<'playlists' | 'tracks'>('playlists');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);

  useEffect(() => {
    getUserPlaylists().then(setPlaylists);
    getUserLikedSongs().then(setLikedSongs);
  }, []);

  return (
    <div className="pb-20 fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Your Library</h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex bg-[#282828] rounded-full overflow-hidden">
            <button
              onClick={() => setActiveTab('playlists')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'playlists' ? 'bg-[#1DB954] text-black' : 'text-white'
              }`}
            >
              Playlists
            </button>
            <button
              onClick={() => setActiveTab('tracks')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'tracks' ? 'bg-[#1DB954] text-black' : 'text-white'
              }`}
            >
              Liked Songs
            </button>
          </div>
          
          <div className="flex bg-[#282828] rounded-full overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`p-2 ${
                view === 'grid' ? 'text-white' : 'text-[#b3b3b3]'
              }`}
            >
              <GridIcon size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 ${
                view === 'list' ? 'text-white' : 'text-[#b3b3b3]'
              }`}
            >
              <ListIcon size={16} />
            </button>
          </div>
          
          <button className="p-2 text-[#b3b3b3] hover:text-white bg-[#282828] rounded-full">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {activeTab === 'playlists' && (
        <div>
          {playlists.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="text-xl font-bold text-white mb-2">Create your first playlist</h2>
              <p className="text-[#b3b3b3] mb-6 max-w-md">It's easy, we'll help you</p>
              <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition">
                Create playlist
              </button>
            </div>
          ) : (
            <div className={view === 'grid' ? 
              "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" : 
              "space-y-2"
            }>
              {playlists.map((playlist) => (
                view === 'grid' ? (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ) : (
                  <div key={playlist.id} className="flex items-center bg-[#181818] hover:bg-[#282828] p-2 rounded">
                    <img src={playlist.imageUrl} alt={playlist.name} className="h-12 w-12 mr-4" />
                    <div>
                      <h3 className="text-white font-medium">{playlist.name}</h3>
                      <p className="text-[#b3b3b3] text-sm">By {playlist.owner}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'tracks' && (
        <div>
          {likedSongs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="text-xl font-bold text-white mb-2">Songs you like will appear here</h2>
              <p className="text-[#b3b3b3] mb-6 max-w-md">Save songs by tapping the heart icon</p>
              <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition">
                Find songs
              </button>
            </div>
          ) : (
            <div>
              {view === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {likedSongs.map((track) => (
                    <TrackCard key={track.id} track={track} />
                  ))}
                </div>
              ) : (
                <div className="bg-[#181818] bg-opacity-40 rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#282828] text-[#b3b3b3] text-sm">
                        <th className="px-4 py-2 text-left w-12">#</th>
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left hidden md:table-cell">Album</th>
                        <th className="px-4 py-2 text-left hidden md:table-cell">Date added</th>
                        <th className="px-4 py-2 text-right"><Clock size={16} /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {likedSongs.map((track, index) => (
                        <tr key={track.id} className="text-[#b3b3b3] text-sm hover:bg-[#282828]">
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
                          <td className="px-4 py-3 text-right">{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;