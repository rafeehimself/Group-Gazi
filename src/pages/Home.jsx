import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (!user) navigate('/login');
    };
    checkUser();
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="container">
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1 style={{ fontSize: '36px', color: '#0F5132', marginBottom: '10px' }}>Lost Something on Campus?</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>Search our database to find your lost items or report a found item.</p>
      </div>
    </div>
  );
}
export default Home;
