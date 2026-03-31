import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';

function Register() {
  const navigate = useNavigate();
  const { registerUser } = useAppData();
  const [searchParams] = useSearchParams();

  const role = useMemo(() => {
    const selectedRole = searchParams.get('role');
    return selectedRole === 'school' ? 'school' : 'donor';
  }, [searchParams]);

  const title = role === 'school' ? 'School Registration' : 'Donor Registration';
  const subtitle =
    role === 'school'
      ? 'Create an account to request and track funding needs.'
      : 'Create an account to discover schools and support campaigns.';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    registerUser({ ...formData, role });
    navigate('/dashboard');
  }

  return (
    <section className="card auth-card">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <form className="simple-form" onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder={role === 'school' ? 'School Name' : 'Full Name'}
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          required
        />
        <input type="password" placeholder="Create Password" required />
        <button type="submit" className="btn btn-primary">Create Account</button>
      </form>
    </section>
  );
}

export default Register;
