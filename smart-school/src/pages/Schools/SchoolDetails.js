import { Link, useParams } from 'react-router-dom';

function SchoolDetails() {
  const { id } = useParams();

  return (
    <section className="card">
      <h1>School Profile #{id}</h1>
      <p>
        This page can show full school details, trust verification, current needs,
        and donation progress bars.
      </p>
      <ul>
        <li>Current Need: Digital classroom kit</li>
        <li>Estimated Budget: Rs. 75,000</li>
        <li>Raised So Far: Rs. 28,400</li>
      </ul>
      <Link to="/donate" className="btn btn-primary">
        Donate to This School
      </Link>
    </section>
  );
}

export default SchoolDetails;
