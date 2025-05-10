import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TrackCard from '../components/ui/TrackCard';
import PlaylistCard from '../components/ui/PlaylistCard';
import ArtistCard from '../components/ui/ArtistCard';
import { getRecentlyPlayed, getFeaturedPlaylists, getNewReleases } from '../services/musicService';
import { Track, Playlist, Artist } from '../types/music';

const HomePage = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>([]);
  const [newReleases, setNewReleases] = useState<Playlist[]>([]);
  const [recommendedArtists, setRecommendedArtists] = useState<Artist[]>([]);
  
  useEffect(() => {
    // These would be API calls in a real application
    getRecentlyPlayed().then(setRecentlyPlayed);
    getFeaturedPlaylists().then(setFeaturedPlaylists);
    getNewReleases().then(setNewReleases);
    
    // Mock data for artists
    setRecommendedArtists([
      { id: '1', name: 'The Weeknd', imageUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
      { id: '2', name: 'Dua Lipa', imageUrl: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
      { id: '3', name: 'Kendrick Lamar', imageUrl: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
      { id: '4', name: 'Billie Eilish', imageUrl: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
      { id: '5', name: 'Drake', imageUrl: 'https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    ]);
  }, []);

  return (
    <div className="pb-20 fade-in">
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Recently played</h2>
          <Link to="/recently-played" className="text-sm text-[#b3b3b3] hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {recentlyPlayed.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Featured playlists</h2>
          <Link to="/featured" className="text-sm text-[#b3b3b3] hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featuredPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">New releases</h2>
          <Link to="/new-releases" className="text-sm text-[#b3b3b3] hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {newReleases.map((album) => (
            <PlaylistCard key={album.id} playlist={album} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Artists you might like</h2>
          <Link to="/recommended-artists" className="text-sm text-[#b3b3b3] hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {recommendedArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;