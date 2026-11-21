import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert("Login Error: " + error.message);
      else { alert("Successfully Logged In! 🎉"); navigate('/'); }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert("Sign Up Error: " + error.message);
      else { alert("Registration Successful! You can now login."); setIsLogin(true); }
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 style={{ textAlign: 'center', color: '#0F5132', marginTop: 0 }}>{isLogin ? 'Student Login' : 'Create an Account'}</h2>
      <form onSubmit={handleAuth}>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="btn btn-green">
          {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#D4AF37', fontWeight: 'bold', cursor: 'pointer' }}>
          {isLogin ? 'Register here' : 'Login here'}
        </span>
      </p>
    </div>
  );
}
export default Login;