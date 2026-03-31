import { NavLink } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
  { to: '/dashboard', label: 'Dashboard' }
];

function Navbar() {
  const { currentUser, logoutUser } = useAppData();

  return (
    <header className="navbar">
      <div className="navbar-content">
        <NavLink to="/" className="brand">
          Smart School Donation
        </NavLink>
        <nav className="nav-links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="auth-links">
          {currentUser ? (
            <button type="button" className="btn btn-secondary" onClick={logoutUser}>
              Logout ({currentUser.role})
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
