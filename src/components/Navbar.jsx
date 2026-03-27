import { Link } from 'react-router-dom';

export default function Navbar({ theme, toggleTheme }) {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <span style={{ fontSize: '1.5rem', marginRight: '4px' }}>⌘</span>
        ND Portfolio
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/about">About Us</Link>
        <Link to="/admin">Class / Admin</Link>
      </nav>
      <div className="nav-actions">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
        <button className="btn-outline">Contact Us ↗</button>
      </div>
    </header>
  );
}
