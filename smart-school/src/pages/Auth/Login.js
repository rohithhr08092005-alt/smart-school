import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginUser } = useAppData();
  const selectedRole = searchParams.get('role');
  const initialRole =
    selectedRole === 'school' || selectedRole === 'admin' ? selectedRole : 'donor';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: initialRole
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    loginUser(formData);
    navigate('/dashboard');
  }

  return (
    <section className="card auth-card">
      <h1>Login</h1>
      <p>Select your role to continue into the role-based dashboard.</p>
      <form className="simple-form" onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Full Name"
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
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="donor">Donor</option>
          <option value="school">School</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </section>
  );
}

export default Login;
