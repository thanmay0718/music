import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

interface SignupPageProps {
  onSignup: () => void;
}

const SignupPage = ({ onSignup }: SignupPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !name) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // In a real app, this would call a registration API
    // For demo purposes, we'll just log in
    onSignup();
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
          <h2 className="text-2xl font-extrabold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-300">
            Or{' '}
            <Link to="/login" className="font-medium text-[#1DB954] hover:text-[#1ed760]">
              sign in to existing account
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
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full bg-[#282828] text-white border-none rounded-md py-3 px-4 focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
                placeholder="Full name"
              />
            </div>
            
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full bg-[#282828] text-white border-none rounded-md py-3 px-4 focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
                placeholder="Password"
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="text-sm font-medium text-gray-300">
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full bg-[#282828] text-white border-none rounded-md py-3 px-4 focus:ring-2 focus:ring-[#1DB954] focus:outline-none"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-full text-sm font-medium text-white bg-[#1DB954] hover:bg-[#1ed760] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DB954] transition-all"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus size={18} className="text-[#1db95499]" />
              </span>
              Sign up
            </button>
          </div>
        </form>
        
        <div className="flex items-center justify-center mt-6">
          <div className="text-center text-sm">
            <p className="text-gray-500">
              By signing up, you agree to our
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

export default SignupPage;