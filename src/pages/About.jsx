import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

const mockTimeline = [
  { id: '1', year_range: '2023 - Present', title: 'Senior UX Designer', desc_text: 'Leading design systems at TechCorp.' },
  { id: '2', year_range: '2020 - 2023', title: 'Product Designer', desc_text: 'Crafting Web3 experiences and NFT platforms.' },
  { id: '3', year_range: '2018 - 2020', title: 'Computer Science Degree', desc_text: 'Graduated with honors from State University.' }
];

export default function About() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTimeline() {
      if (!supabase) {
        setTimeline(mockTimeline);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('timeline_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching timeline:", error);
        setTimeline(mockTimeline);
      } else {
        setTimeline(data || []);
      }
      setLoading(false);
    }
    fetchTimeline();
  }, []);

  return (
    <div className="page-about animate-fade">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Combining aesthetic design with robust engineering.</p>
        {!supabase && <p style={{color: 'orange', fontSize: '0.8rem', marginTop: '1rem'}}>Demo Mode: Supabase not connected.</p>}
      </div>

      <div className="timeline-section">
        <h2>Experience & Education</h2>
        {loading ? <p>Loading timeline...</p> : (
          <div className="timeline-container">
            {timeline.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year_range}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc_text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
