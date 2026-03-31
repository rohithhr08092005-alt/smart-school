import { Link } from 'react-router-dom';

function SchoolCard({ school }) {
  return (
    <article className="card school-card">
      <h3>{school.name}</h3>
      <p>{school.location}</p>
      <p className="muted">Need: {school.need}</p>
      <Link to={`/schools/${school.id}`} className="btn btn-primary">
        View Details
      </Link>
    </article>
  );
}

export default SchoolCard;
