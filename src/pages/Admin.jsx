import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');

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
        if (session) {
          fetchProjects();
          fetchBlogs();
        }
      });
    } else {
      // Mock local fetch
      const storedProjects = localStorage.getItem('blog_projects');
      if (storedProjects) setProjects(JSON.parse(storedProjects));
      const storedBlogs = localStorage.getItem('blog_posts');
      if (storedBlogs) setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  async function fetchBlogs() {
    if (!supabase) return;
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (data) setBlogs(data);
  }

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

  const addBlog = async () => {
    if (!newBlogTitle.trim()) return;
    const newPost = { title: newBlogTitle, excerpt: newBlogExcerpt, content: newBlogContent };
    
    if (!supabase) {
      const updated = [{...newPost, id: Date.now().toString(), created_at: new Date().toISOString()}, ...blogs];
      setBlogs(updated);
      localStorage.setItem('blog_posts', JSON.stringify(updated));
      setNewBlogTitle('');
      setNewBlogExcerpt('');
      setNewBlogContent('');
      return;
    }

    const { error } = await supabase.from('blogs').insert([newPost]);
    if (error) {
      alert(error.message);
    } else {
      setNewBlogTitle('');
      setNewBlogExcerpt('');
      setNewBlogContent('');
      fetchBlogs();
    }
  };

  const deleteBlog = async (id) => {
    if (!supabase) {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      localStorage.setItem('blog_posts', JSON.stringify(updated));
      return;
    }

    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      alert(error.message);
    } else {
      fetchBlogs();
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

      <div className="admin-tabs">
        <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>Projects</button>
        <button className={activeTab === 'blogs' ? 'active' : ''} onClick={() => setActiveTab('blogs')}>Blog Posts</button>
      </div>
      
      {activeTab === 'projects' ? (
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
      ) : (
        <div className="dashboard-section">
          <h3>Manage Blog Posts {supabase ? '(Live DB)' : '(Local Mock)'}</h3>
          <div className="add-form vertical">
            <input type="text" value={newBlogTitle} onChange={(e) => setNewBlogTitle(e.target.value)} placeholder="Blog Title" />
            <textarea value={newBlogExcerpt} onChange={(e) => setNewBlogExcerpt(e.target.value)} placeholder="Excerpt" />
            <textarea value={newBlogContent} onChange={(e) => setNewBlogContent(e.target.value)} placeholder="Content" />
            <button onClick={addBlog} className="btn-primary">+ Publish Post</button>
          </div>

          <ul className="admin-list">
            {blogs.map(b => (
              <li key={b.id}>
                <span>{b.title}</span>
                <button className="btn-delete" onClick={() => deleteBlog(b.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
