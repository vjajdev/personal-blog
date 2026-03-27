import { useState, useEffect } from 'react';

// Mock data service simulating localStorage DB
const mockProjects = [
  { id: 1, title: 'Azuki Collection', desc: 'A collection of 10,000 avatars that give you membership access to The Garden.', mockImg: 'red-bg', mockTag: 'NFT' },
  { id: 2, title: 'Design System', desc: 'Creating a comprehensive UI kit for enterprise applications.', mockImg: 'dark-bg', mockTag: 'UI/UX' },
  { id: 3, title: 'Crypto Marketplace', desc: 'Digital marketplace for crypto collections and non-fungible tokens.', mockImg: 'cream-bg', mockTag: 'Web3' }
];

export default function Store() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // In actual implementation, data comes from localStorage or API
    const stored = localStorage.getItem('blog_projects');
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      setProjects(mockProjects);
      localStorage.setItem('blog_projects', JSON.stringify(mockProjects));
    }
  }, []);

  return (
    <div className="page-store animate-fade">
      <div className="store-header">
        <h1>• START HERE</h1>
        <h2 className="title-massive">
          Discover <span className="text-secondary">Rare<br/>Collections Of</span><br/>NFTs.
        </h2>
        <p className="subtitle">Digital marketplace for crypto collections and non-fungible tokens NFTs.</p>
      </div>

      <div className="projects-grid">
        {projects.map(p => (
          <div key={p.id} className="project-card">
            <div className={`project-img ${p.mockImg}`}></div>
            <div className="project-info">
              <span className="project-tag">{p.mockTag}</span>
              <h3>{p.title} ↗</h3>
              <p>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
