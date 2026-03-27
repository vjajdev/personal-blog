import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

const mockBlogs = [
  { id: '1', title: 'The Future of Web3', excerpt: 'Exploring the next evolution of the internet and decentralized apps.', content: 'Full content about Web3...', created_at: new Date().toISOString() },
  { id: '2', title: 'Modern UI Patterns', excerpt: 'How to build accessible and beautiful interfaces in 2024.', content: 'Full content about UI...', created_at: new Date().toISOString() },
  { id: '3', title: 'Career in Design', excerpt: 'My journey from computer science to product design.', content: 'Full content about career...', created_at: new Date().toISOString() }
];

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      if (!supabase) {
        setBlogs(mockBlogs);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blogs:', error);
        setBlogs(mockBlogs);
      } else {
        setBlogs(data || []);
      }
      setLoading(false);
    }

    fetchBlogs();
  }, []);

  return (
    <div className="page-blog animate-fade">
      <div className="blog-header">
        <h1>• INSIGHTS</h1>
        <h2 className="title-massive">
          Latest <span className="text-secondary">Updates &</span><br/>Articles.
        </h2>
        <p className="subtitle">Sharing my thoughts on design, engineering, and the future of technology.</p>
        {!supabase && <p style={{color: 'orange', fontSize: '0.8rem', marginTop: '1rem'}}>Demo Mode: Supabase not connected.</p>}
      </div>

      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <div className="blog-list">
          {blogs.map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-meta">
                <span className="blog-date">{new Date(post.created_at).toLocaleDateString()}</span>
                <span className="blog-author">By {post.author || 'Admin'}</span>
              </div>
              <h3 className="blog-title">{post.title} ↗</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <button className="read-more">Read Full Post</button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
