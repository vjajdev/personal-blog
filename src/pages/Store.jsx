import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

const mockProjects = [
  { id: '1', title: 'Azuki Collection', desc_text: 'A collection of 10,000 avatars that give you membership access to The Garden.', mock_img: 'red-bg', mock_tag: 'NFT' },
  { id: '2', title: 'Design System', desc_text: 'Creating a comprehensive UI kit for enterprise applications.', mock_img: 'dark-bg', mock_tag: 'UI/UX' },
  { id: '3', title: 'Crypto Marketplace', desc_text: 'Digital marketplace for crypto collections and non-fungible tokens.', mock_img: 'cream-bg', mock_tag: 'Web3' }
];

export default function Store() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      if (!supabase) {
        console.warn("No Supabase connection. Using mock data.");
        setProjects(mockProjects);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        setProjects(mockProjects);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  return (
    <div className="page-store animate-fade">
      <div className="store-header">
        <h1>• START HERE</h1>
        <h2 className="title-massive">
          Discover <span className="text-secondary">Rare<br/>Collections Of</span><br/>NFTs.
        </h2>
        <p className="subtitle">Digital marketplace for crypto collections and non-fungible tokens NFTs.</p>
        {!supabase && <p style={{color: 'orange', fontSize: '0.8rem', marginTop: '1rem'}}>Demo Mode: Supabase not connected.</p>}
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="projects-grid">
          {projects.map(p => (
            <div key={p.id} className="project-card">
              <div className={`project-img ${p.mock_img || 'dark-bg'}`}></div>
              <div className="project-info">
                <span className="project-tag">{p.mock_tag || 'Project'}</span>
                <h3>{p.title} ↗</h3>
                <p>{p.desc_text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
