import SchoolCard from '../../components/school/SchoolCard';

const schools = [
  { id: '1', name: 'Green Valley Public School', location: 'Coimbatore', need: 'Digital classroom projector' },
  { id: '2', name: 'Sunrise Government School', location: 'Madurai', need: 'Library books and shelves' },
  { id: '3', name: 'Little Steps Primary School', location: 'Salem', need: 'Smart learning tablets' },
  { id: '4', name: 'Blooming Kids School', location: 'Trichy', need: 'Science lab equipment' }
];

function SchoolsList() {
  return (
    <section>
      <div className="section-header">
        <h1>Schools Needing Support</h1>
        <p>Choose a school and fund a specific requirement.</p>
      </div>
      <div className="grid">
        {schools.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>
    </section>
  );
}

export default SchoolsList;
