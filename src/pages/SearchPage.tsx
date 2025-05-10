import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { searchMusic } from '../services/musicService';
import TrackCard from '../components/ui/TrackCard';
import PlaylistCard from '../components/ui/PlaylistCard';
import ArtistCard from '../components/ui/ArtistCard';
import { Track, Playlist, Artist } from '../types/music';

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<{
    tracks: Track[];
    playlists: Playlist[];
    artists: Artist[];
  }>({
    tracks: [],
    playlists: [],
    artists: [],
  });

  useEffect(() => {
    setSearchQuery(query);
    
    // Only search if there's a query
    if (query) {
      searchMusic(query).then(setResults);
    } else {
      // Clear results if no query
      setResults({
        tracks: [],
        playlists: [],
        artists: [],
      });
    }
  }, [query]);

  const hasResults = results.tracks.length > 0 || results.playlists.length > 0 || results.artists.length > 0;

  return (
    <div className="pb-20 fade-in">
      {!query && (
        <div className="flex flex-col items-center justify-center py-12">
          <SearchIcon size={64} className="text-[#b3b3b3] mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Search for your favorite music</h1>
          <p className="text-[#b3b3b3]">Find songs, artists, albums, and playlists</p>
        </div>
      )}

      {query && !hasResults && (
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold text-white mb-2">No results found for "{query}"</h1>
          <p className="text-[#b3b3b3] mb-4">Please try another search term or check your spelling</p>
        </div>
      )}

      {hasResults && (
        <div>
          <h1 className="text-2xl font-bold text-white mb-6">Results for "{query}"</h1>

          {results.tracks.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.tracks.map((track) => (
                  <TrackCard key={track.id} track={track} />
                ))}
              </div>
            </section>
          )}

          {results.artists.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {results.artists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </section>
          )}

          {results.playlists.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.playlists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;