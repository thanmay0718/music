import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart, LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-[#282828] text-white' : 'text-[#b3b3b3] hover:text-white';
  };

  return (
    <div className="w-[240px] hidden md:flex md:flex-col bg-black h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center">
            <div className="text-black font-bold text-2xl">S</div>
          </div>
          <span className="text-white font-bold text-xl">Spotifake</span>
        </div>
        
        <nav>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors ${isActive('/')}`}
              >
                <Home size={24} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/search" 
                className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors ${isActive('/search')}`}
              >
                <Search size={24} />
                <span>Search</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/library" 
                className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors ${isActive('/library')}`}
              >
                <Library size={24} />
                <span>Your Library</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="mt-8 space-y-2">
          <Link 
            to="/create-playlist" 
            className="flex items-center gap-3 px-4 py-3 text-[#b3b3b3] hover:text-white rounded-md font-medium transition-colors"
          >
            <PlusSquare size={24} />
            <span>Create Playlist</span>
          </Link>
          <Link 
            to="/liked-songs" 
            className="flex items-center gap-3 px-4 py-3 text-[#b3b3b3] hover:text-white rounded-md font-medium transition-colors"
          >
            <Heart size={24} />
            <span>Liked Songs</span>
          </Link>
        </div>
      </div>
      
      <div className="mt-auto p-6">
        <div className="border-t border-[#282828] pt-4">
          <Link 
            to="/support" 
            className="text-sm text-[#b3b3b3] hover:text-white py-2 block"
          >
            Support
          </Link>
          <button 
            className="flex items-center gap-2 mt-4 text-[#b3b3b3] hover:text-white"
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;