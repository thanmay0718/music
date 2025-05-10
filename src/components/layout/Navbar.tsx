import { useState } from 'react';
import { ChevronLeft, ChevronRight, Bell, User, Search, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10 pl-0 md:pl-[240px]">
      <div className="flex items-center justify-between h-16 bg-[#121212] bg-opacity-95 px-4 md:px-8">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button 
              onClick={() => navigate(-1)} 
              className="bg-black bg-opacity-70 rounded-full p-1 text-white hover:bg-opacity-80"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => navigate(1)} 
              className="bg-black bg-opacity-70 rounded-full p-1 text-white hover:bg-opacity-80"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {location.pathname === '/search' && (
            <form onSubmit={handleSearch} className="relative ml-2">
              <div className={`flex items-center bg-white rounded-full px-3 py-1.5 transition-all ${isSearchFocused ? 'ring-2 ring-white' : ''}`}>
                <Search size={20} className="text-black" />
                <input 
                  type="text"
                  placeholder="What do you want to listen to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="bg-transparent text-black placeholder-gray-500 ml-2 outline-none w-60"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    onClick={() => setSearchQuery('')} 
                    className="text-black"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button className="bg-black bg-opacity-70 rounded-full p-2 text-white hover:bg-opacity-80">
            <Bell size={20} />
          </button>
          <button className="bg-black bg-opacity-70 rounded-full p-2 text-white hover:bg-opacity-80">
            <User size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;