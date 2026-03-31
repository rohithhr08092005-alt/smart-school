import { Link } from 'react-router-dom';

function DonationSuccess() {
  return (
    <section className="card">
      <h1>Donation Successful</h1>
      <p>Thank you for helping students access better education resources.</p>
      <Link to="/dashboard" className="btn btn-primary">
        View Donation Dashboard
      </Link>
    </section>
  );
}

export default DonationSuccess;
