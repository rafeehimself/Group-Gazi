import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <h2 className="nav-logo">IIUC ReFind</h2>
        <Link to="/">Home</Link>
      </div>

      <div className="nav-links">
        {user ? (
          <>
            <span style={{ fontSize: '14px', color: '#ccc' }}>{user.email}</span>
            <button onClick={handleLogout} className="btn btn-red">Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn btn-gold">Login</Link>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
