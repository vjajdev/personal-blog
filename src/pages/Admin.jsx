import { useState, useEffect } from 'react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('blog_projects');
    if (stored) {
      setProjects(JSON.parse(stored));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const addProject = () => {
    if (!newProjectTitle.trim()) return;
    const newProj = {
      id: Date.now(),
      title: newProjectTitle,
      desc: 'New project description.',
      mockImg: 'cream-bg',
      mockTag: 'New'
    };
    const updated = [...projects, newProj];
    setProjects(updated);
    localStorage.setItem('blog_projects', JSON.stringify(updated));
    setNewProjectTitle('');
  };

  const deleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('blog_projects', JSON.stringify(updated));
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login animate-fade">
        <div className="login-card">
          <h2>Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username (admin)" required />
            <input type="password" placeholder="Password (admin)" required />
            <button type="submit" className="btn-primary">Login ↗</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard animate-fade">
      <h2>Admin Dashboard</h2>
      
      <div className="dashboard-section">
        <h3>Manage Projects</h3>
        <div className="add-form">
          <input 
            type="text" 
            value={newProjectTitle} 
            onChange={(e) => setNewProjectTitle(e.target.value)} 
            placeholder="New project title" 
          />
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
      
      {/* We can expand timeline management similarly */}
      <div className="dashboard-section">
        <h3>Manage Timeline (Coming Soon)</h3>
        <p className="text-muted">Edit options for About page timeline will appear here.</p>
      </div>
    </div>
  );
}
