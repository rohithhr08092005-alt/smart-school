import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const slides = useMemo(
    () => [
      `${process.env.PUBLIC_URL}/school.jpeg`,
      `${process.env.PUBLIC_URL}/im1.jpeg`,
      `${process.env.PUBLIC_URL}/img3.jpg`,
      `${process.env.PUBLIC_URL}/img4.jpg`
    ],
    []
  );
  const [slideIndex, setSlideIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let switchTimeout;
    const interval = window.setInterval(() => {
      setIsVisible(false);
      switchTimeout = window.setTimeout(() => {
        setSlideIndex((prev) => (prev + 1) % slides.length);
        setIsVisible(true);
      }, 320);
    }, 5200);

    return () => {
      window.clearInterval(interval);
      if (switchTimeout) {
        window.clearTimeout(switchTimeout);
      }
    };
  }, [slides.length]);

  const homeBackgroundStyle = {
    backgroundImage: `linear-gradient(160deg, rgba(10, 27, 47, 0.34) 0%, rgba(14, 45, 73, 0.2) 45%, rgba(18, 59, 105, 0.28) 100%), url(${slides[slideIndex]})`
  };

  return (
    <section className="home-entry-wrap">
      <div
        className={`home-slideshow ${isVisible ? 'home-slideshow-visible' : 'home-slideshow-hidden'}`}
        style={homeBackgroundStyle}
        aria-hidden="true"
      />
      <div className="home-entry">
        <p className="eyebrow home-welcome">WELCOME</p>
        <h1 className="home-title">Smart School Donation System</h1>
        <p className="muted home-subtitle">
          Choose your role to continue.
        </p>

        <div className="role-grid">
          <Link to="/login?role=school" className="role-card role-school">
            <div className="role-icon" aria-hidden="true">School</div>
            <h2>School Admin</h2>
            <p>
              Add requirements, manage requests, and upload completion proof.
            </p>
            <span className="btn btn-primary">Continue</span>
          </Link>

          <Link to="/login?role=donor" className="role-card role-donor">
            <div className="role-icon" aria-hidden="true">Donation</div>
            <h2>Donor</h2>
            <p>
              View school needs, donate, track progress, and see completed work.
            </p>
            <span className="btn btn-secondary">Continue</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
