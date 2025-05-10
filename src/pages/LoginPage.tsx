import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // In a real app, this would call an authentication API
    // For demo purposes, we'll just log in
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1DB954] to-[#121212] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-black bg-opacity-80 p-8 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center">
              <div className="text-black font-bold text-2xl">S</div>
            </div>
            <span className="text-white font-bold text-xl">Spotifake</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-300">
            Or{' '}
            <Link to="/signup" className="font-medium text-[#1DB954] hover:text-[#1ed760]">
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full bg-[#282828] text-white border-none rounded-md py-3 px-4 focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
                placeholder="Email address"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full bg-[#282828] text-white border-none rounded-md py-3 px-4 focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 accent-[#1DB954]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#1DB954] hover:text-[#1ed760]">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-full text-sm font-medium text-white bg-[#1DB954] hover:bg-[#1ed760] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DB954] transition-all"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn size={18} className="text-[#1db95499]" />
              </span>
              Sign in
            </button>
          </div>
        </form>
        
        <div className="flex items-center justify-center mt-6">
          <div className="text-center text-sm">
            <p className="text-gray-500">
              By signing in, you agree to our
            </p>
            <div className="mt-1">
              <a href="#" className="text-[#1DB954] hover:text-[#1ed760] mr-2">
                Terms of Service
              </a>
              <span className="text-gray-500">and</span>
              <a href="#" className="ml-2 text-[#1DB954] hover:text-[#1ed760]">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;