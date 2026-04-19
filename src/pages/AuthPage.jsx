import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      let msg = err.message.replace('Firebase:', '').trim();
      if (msg.includes('auth/invalid-credential')) {
        msg = 'Invalid credentials. If you are new, please click "Sign up".';
      } else if (msg.includes('auth/user-not-found')) {
        msg = 'No account found with this email. Please sign up first.';
      } else if (msg.includes('auth/wrong-password')) {
        msg = 'Incorrect password. Please try again.';
      } else if (msg.includes('auth/email-already-in-use')) {
        msg = 'This email is already registered. Please log in instead.';
      } else if (msg.includes('auth/weak-password')) {
        msg = 'Your password is too weak. It must be at least 6 characters.';
      }
      setError(msg);
    }
    setLoading(false);
  }

  async function handleGoogle() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      let msg = err.message.replace('Firebase:', '').trim();
      if (msg.includes('auth/popup-closed-by-user')) {
        msg = 'Google Sign-In was cancelled.';
      } else {
        msg = 'Google Sign-In failed. Please try again.';
      }
      setError(msg);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0F0F13] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Visual flair */}
      <div className="absolute w-[500px] h-[500px] bg-[#6C63FF] opacity-10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="bg-[#1A1A24] border border-[#2E2E3D] p-8 rounded-2xl w-full max-w-md shadow-2xl z-10 relative">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#6C63FF] mb-2">ResumeForge</h1>
        <p className="text-center text-[#8B8A9F] mb-8">{isLogin ? 'Welcome back' : 'Create an account'}</p>

        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded mb-6 text-sm text-center">{error}</div>}

        <button 
          onClick={handleGoogle} 
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors mb-6 shadow-sm disabled:opacity-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-[#2E2E3D] flex-1" />
          <span className="text-[#8B8A9F] text-sm">or</span>
          <div className="h-px bg-[#2E2E3D] flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-[#8B8A9F] mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#0F0F13] border border-[#2E2E3D] text-[#F1F0FF] rounded-lg p-3 focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm text-[#8B8A9F] mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#0F0F13] border border-[#2E2E3D] text-[#F1F0FF] rounded-lg p-3 focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#6C63FF] hover:bg-[#5A52E0] text-white py-3 rounded-lg font-medium transition-colors mt-2 shadow-md disabled:opacity-50"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#8B8A9F]">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#6C63FF] hover:underline font-medium">
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}
