import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Player from '../player/Player';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col h-screen bg-[#121212]">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pt-16 pb-24 relative">
          <Navbar />
          <div className="px-4 md:px-8 pb-4">
            {children}
          </div>
        </main>
      </div>
      <Player />
    </div>
  );
};

export default MainLayout;