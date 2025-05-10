import { useState } from 'react';
import { PlayerProvider } from './contexts/PlayerContext';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PlaylistPage from './pages/PlaylistPage';
import ArtistPage from './pages/ArtistPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SupportPage from './pages/SupportPage';
import LibraryPage from './pages/LibraryPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // For demo purposes, toggle auth state
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <Router>
      <AuthProvider>
        <PlayerProvider>
          {!isAuthenticated ? (
            <Routes>
              <Route path="/login" element={<LoginPage onLogin={toggleAuth} />} />
              <Route path="/signup" element={<SignupPage onSignup={toggleAuth} />} />
              <Route path="*" element={<LoginPage onLogin={toggleAuth} />} />
            </Routes>
          ) : (
            <MainLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/playlist/:id" element={<PlaylistPage />} />
                <Route path="/artist/:id" element={<ArtistPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/support" element={<SupportPage />} />
              </Routes>
            </MainLayout>
          )}
        </PlayerProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;