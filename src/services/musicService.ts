import { Track, Playlist, Artist } from '../types/music';

// Mock data - In a real app, these would be API calls to your backend
const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Today\'s Top Hits',
    owner: 'Spotify',
    imageUrl: 'https://images.pexels.com/photos/1293551/pexels-photo-1293551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tracks: generateMockTracks(20),
  },
  {
    id: '2',
    name: 'RapCaviar',
    owner: 'Spotify',
    imageUrl: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tracks: generateMockTracks(15),
  },
  {
    id: '3',
    name: 'All Out 2010s',
    owner: 'Spotify',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tracks: generateMockTracks(18),
  },
  {
    id: '4',
    name: 'Rock Classics',
    owner: 'Spotify',
    imageUrl: 'https://images.pexels.com/photos/96380/pexels-photo-96380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tracks: generateMockTracks(22),
  },
  {
    id: '5',
    name: 'Chill Hits',
    owner: 'Spotify',
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tracks: generateMockTracks(17),
  },
];

// Function to generate mock tracks
function generateMockTracks(count: number): Track[] {
  const tracks: Track[] = [];
  const artists = ['The Weeknd', 'Dua Lipa', 'Billie Eilish', 'Post Malone', 'Drake', 'Kendrick Lamar', 'Ariana Grande'];
  const albums = ['After Hours', 'Future Nostalgia', 'Happier Than Ever', 'Hollywood\'s Bleeding', 'Certified Lover Boy', 'DAMN.', 'Positions'];
  
  for (let i = 1; i <= count; i++) {
    const artistIndex = Math.floor(Math.random() * artists.length);
    const albumIndex = Math.floor(Math.random() * albums.length);
    const duration = Math.floor(Math.random() * 180) + 120; // 2-5 minutes
    const day = Math.floor(Math.random() * 28) + 1;
    const month = Math.floor(Math.random() * 12) + 1;
    
    tracks.push({
      id: `track-${i}`,
      title: `Track ${i}`,
      artist: artists[artistIndex],
      album: albums[albumIndex],
      albumImageUrl: `https://images.pexels.com/photos/${1690000 + i}/pexels-photo-${1690000 + i}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
      duration,
      dateAdded: `${month}/${day}/2023`,
      plays: Math.floor(Math.random() * 1000000),
    });
  }
  
  return tracks;
}

// API simulation functions
export const getRecentlyPlayed = (): Promise<Track[]> => {
  return Promise.resolve(generateMockTracks(6));
};

export const getFeaturedPlaylists = (): Promise<Playlist[]> => {
  return Promise.resolve(mockPlaylists);
};

export const getNewReleases = (): Promise<Playlist[]> => {
  // Generate some "new releases" - in a real app, these would be actual albums
  return Promise.resolve(mockPlaylists.map(playlist => ({
    ...playlist,
    id: `new-${playlist.id}`,
    name: `New Album ${playlist.id}`,
  })));
};

export const getPlaylistById = (id: string): Promise<Playlist> => {
  const playlist = mockPlaylists.find(p => p.id === id);
  
  if (playlist) {
    return Promise.resolve(playlist);
  }
  
  // Return the first playlist if not found
  return Promise.resolve(mockPlaylists[0]);
};

export const searchMusic = (query: string): Promise<{
  tracks: Track[];
  playlists: Playlist[];
  artists: Artist[];
}> => {
  // In a real app, this would search your database
  const tracks = generateMockTracks(10).filter(track => 
    track.title.toLowerCase().includes(query.toLowerCase()) || 
    track.artist.toLowerCase().includes(query.toLowerCase())
  );
  
  const playlists = mockPlaylists.filter(playlist => 
    playlist.name.toLowerCase().includes(query.toLowerCase())
  );
  
  const artists: Artist[] = [
    { id: '1', name: 'The Weeknd', imageUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    { id: '2', name: 'Dua Lipa', imageUrl: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    { id: '3', name: 'Kendrick Lamar', imageUrl: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    { id: '4', name: 'Billie Eilish', imageUrl: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    { id: '5', name: 'Drake', imageUrl: 'https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
  ].filter(artist => 
    artist.name.toLowerCase().includes(query.toLowerCase())
  );
  
  return Promise.resolve({ tracks, playlists, artists });
};

export const getUserPlaylists = (): Promise<Playlist[]> => {
  // In a real app, this would fetch the user's playlists from your API
  // For demo, we'll return the first 3 playlists
  return Promise.resolve(mockPlaylists.slice(0, 3));
};

export const getUserLikedSongs = (): Promise<Track[]> => {
  // In a real app, this would fetch the user's liked songs from your API
  return Promise.resolve(generateMockTracks(12));
};

export const getArtistById = (id: string): Promise<Artist> => {
  // In a real app, this would fetch artist data from your API
  return Promise.resolve({
    id,
    name: id === '1' ? 'The Weeknd' : `Artist ${id}`,
    imageUrl: `https://images.pexels.com/photos/169${id}161/pexels-photo-169${id}161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
  });
};

export const getArtistTracks = (artistId: string): Promise<Track[]> => {
  // In a real app, this would fetch the artist's tracks from your API
  return Promise.resolve(generateMockTracks(10).map(track => ({
    ...track,
    artist: artistId === '1' ? 'The Weeknd' : `Artist ${artistId}`,
  })));
};

export const getArtistAlbums = (artistId: string): Promise<Playlist[]> => {
  // In a real app, this would fetch the artist's albums from your API
  return Promise.resolve(mockPlaylists.slice(0, 4).map(playlist => ({
    ...playlist,
    name: `Album ${playlist.id}`,
    owner: artistId === '1' ? 'The Weeknd' : `Artist ${artistId}`,
  })));
};