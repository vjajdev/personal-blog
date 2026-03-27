import { useState, useEffect } from 'react';

const mockTimeline = [
  { id: 1, year: '2023 - Present', title: 'Senior UX Designer', desc: 'Leading design systems at TechCorp.' },
  { id: 2, year: '2020 - 2023', title: 'Product Designer', desc: 'Crafting Web3 experiences and NFT platforms.' },
  { id: 3, year: '2018 - 2020', title: 'Computer Science Degree', desc: 'Graduated with honors from State University.' }
];

export default function About() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('blog_timeline');
    if (stored) {
      setTimeline(JSON.parse(stored));
    } else {
      setTimeline(mockTimeline);
      localStorage.setItem('blog_timeline', JSON.stringify(mockTimeline));
    }
  }, []);

  return (
    <div className="page-about animate-fade">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Combining aesthetic design with robust engineering.</p>
        <div className="profile-img-placeholder"></div>
      </div>

      <div className="timeline-section">
        <h2>Experience & Education</h2>
        <div className="timeline-container">
          {timeline.map((item, index) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
