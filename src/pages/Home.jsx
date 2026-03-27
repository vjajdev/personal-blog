export default function Home() {
  return (
    <div className="page-home animate-fade">
      <section className="hero-section">
        <h1 className="hero-title">
          <span className="hashtag">#</span>LEVEL UP YOUR
          <br />
          DESIGN <span className="highlight-img-placeholder">WITH OUR</span>
          <br />
          DESIGN CLASS
        </h1>
        <div className="hero-subtitle">
          <p>With more than<br/>2K+ Members<br/>500+ Tutorials</p>
          <button className="btn-join">Join Us ↗</button>
        </div>
      </section>

      <section className="classes-section">
        <div className="classes-header">
          <h2>Our Classes</h2>
          <p>Here is our types of design classes that will accompany you in learning graphic design.</p>
        </div>
        
        <div className="cards-grid">
          {/* Card Mockups */}
          <div className="class-card">
            <h3>Beginner<br/>Class ↗</h3>
            <p>For those of you who are just learning design.</p>
            <div className="card-mock-img"></div>
          </div>
          
          <div className="class-card highlight">
            <h3>Expert<br/>Class ↗</h3>
            <p>For those of you who want to upgrade your skill.</p>
            <div className="card-mock-img"></div>
          </div>

          <div className="class-card">
            <h3>Employee<br/>Class ↗</h3>
            <p>For those of you who are busy but want to learn.</p>
            <div className="card-mock-img"></div>
          </div>
        </div>
        
        <div className="hero-footer-cta">
          <h2>KEEP <span className="text-primary">CREATING</span> UNTIL YOU<br/>FIND YOUR OWN <span className="text-primary">AUDIENCE</span></h2>
          <p>Defri Muhammad Fahrul Habiebi<br/>Ruang Edit Founder</p>
        </div>
      </section>
    </div>
  );
}
