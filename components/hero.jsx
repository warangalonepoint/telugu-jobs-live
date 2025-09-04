// components/Hero.jsx
export default function Hero() {
  return (
    <header className="hero">
      <div className="container hero-inner">
        <div>
          <div className="brand">
            <div className="brand-icon" />
            <div>
              <div className="brand-title">Telugu Jobs</div>
              <div className="brand-sub">AP & Telangana</div>
            </div>
            <a className="btn btn-ghost brand-cta" href="/post-job">Post a Job</a>
          </div>

          <h1 className="hero-title">
            Find Your Dream <br /> Job in <span className="highlight">AP & Telangana</span>
          </h1>
          <p className="hero-sub">
            Discover fresh, local opportunities across Andhra Pradesh and Telangana.
            Your next career move starts here.
          </p>
        </div>
      </div>
    </header>
  );
}
