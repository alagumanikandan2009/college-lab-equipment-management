import { useState } from 'react';

interface Props {
  onLogin: () => void;
}

export default function Login({ onLogin }: Props) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'vlsi') {
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div 
      className="flex min-h-screen font-sans bg-slate-950" 
      style={{ fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif' }}
    >
      {/* Left Pane - Branding & Welcome */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-slate-900 border-r border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900 z-0"></div>
        <div className="relative z-10 flex items-center space-x-4">
          <div className="bg-white p-2 rounded-lg shadow-lg">
            <img src="/sece_logo.png" alt="Sri Eshwar College Logo" className="h-12 w-auto object-contain" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Sri Eshwar College of Engineering</h2>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Institution of Excellence</p>
          </div>
        </div>
        
        <div className="relative z-10 max-w-lg mt-20">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Lab Equipment <br/><span className="text-blue-500">Management System</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Securely access and manage laboratory resources, track equipment status, and streamline academic operations.
          </p>
        </div>

        <div className="relative z-10 text-slate-500 text-sm">
          © {new Date().getFullYear()} Sri Eshwar College of Engineering.
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="w-full max-w-md space-y-8">
          
          <div className="lg:hidden text-center mb-10">
            <img src="/sece_logo.png" alt="Sri Eshwar College Logo" className="mx-auto h-20 mb-4 object-contain bg-white p-2 rounded-lg shadow-md" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Sri Eshwar College of Engineering</h1>
            <p className="text-blue-500 text-sm font-semibold uppercase mt-1">Lab Equipment Management</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">Sign In</h2>
            <p className="text-slate-400 mt-2 text-sm">Enter your credentials to access the portal.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">User ID</label>
              <input
                type="text"
                list="saved-users"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 text-white border border-slate-700 rounded-lg focus:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-500 shadow-sm"
                placeholder="Enter your user ID"
                required
              />
              <datalist id="saved-users">
                <option value="mani1234" />
                <option value="jennifer345" />
                <option value="camila3456" />
              </datalist>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-sm text-blue-500 hover:text-blue-400 font-medium transition-colors">Forgot Password?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 text-white border border-slate-700 rounded-lg focus:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-500 shadow-sm"
                placeholder="Enter your password"
                required
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-950/50 border border-red-900/50 rounded-lg">
                <p className="text-red-500 text-sm font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] flex justify-center items-center"
            >
              Sign In
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
          
          <div className="lg:hidden mt-8 text-center text-slate-500 text-xs">
            © {new Date().getFullYear()} Sri Eshwar College of Engineering.
          </div>
        </div>
      </div>
    </div>
  );
}