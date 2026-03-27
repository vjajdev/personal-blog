import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');

  // Local state bypass if no Supabase
  const [localLoggedIn, setLocalLoggedIn] = useState(false);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        if (session) fetchProjects();
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session) fetchProjects();
      });
    } else {
      // Mock local fetch
      const stored = localStorage.getItem('blog_projects');
      if (stored) setProjects(JSON.parse(stored));
    }
  }, []);

  async function fetchProjects() {
    if (!supabase) return;
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!supabase) {
      // Offline fallback
      setLocalLoggedIn(true);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setLocalLoggedIn(false);
    setSession(null);
  };

  const addProject = async () => {
    if (!newProjectTitle.trim()) return;
    const newProj = { title: newProjectTitle, desc_text: 'Dynamic description.', mock_img: 'cream-bg', mock_tag: 'New' };
    
    if (!supabase) {
      const updated = [{...newProj, id: Date.now().toString()}, ...projects];
      setProjects(updated);
      localStorage.setItem('blog_projects', JSON.stringify(updated));
      setNewProjectTitle('');
      return;
    }

    const { error } = await supabase.from('projects').insert([newProj]);
    if (error) {
      alert(error.message);
    } else {
      setNewProjectTitle('');
      fetchProjects();
    }
  };

  const deleteProject = async (id) => {
    if (!supabase) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      localStorage.setItem('blog_projects', JSON.stringify(updated));
      return;
    }

    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      alert(error.message);
    } else {
      fetchProjects();
    }
  };

  const isLoggedIn = !!session || localLoggedIn;

  if (!isLoggedIn) {
    return (
      <div className="admin-login animate-fade">
        <div className="login-card">
          <h2>{supabase ? 'Admin Login' : 'Admin Mock Login'}</h2>
          {!supabase && <p style={{fontSize: '0.85rem', color: '#ff9800', marginBottom: '1rem'}}>Supabase not connected. Enter any text to bypass.</p>}
          <form onSubmit={handleLogin}>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email / Username" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit" className="btn-primary">Login ↗</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard animate-fade">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn-outline">Logout</button>
      </div>
      
      <div className="dashboard-section">
        <h3>Manage Projects {supabase ? '(Live DB)' : '(Local Mock)'}</h3>
        <div className="add-form">
          <input type="text" value={newProjectTitle} onChange={(e) => setNewProjectTitle(e.target.value)} placeholder="New project title" />
          <button onClick={addProject} className="btn-primary">+ Add Project</button>
        </div>

        <ul className="admin-list">
          {projects.map(p => (
            <li key={p.id}>
              <span>{p.title}</span>
              <button className="btn-delete" onClick={() => deleteProject(p.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
