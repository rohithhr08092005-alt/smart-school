import DonationForm from '../../components/donation/DonationForm';

function Donate() {
  return (
    <section>
      <div className="section-header">
        <h1>Make a Donation</h1>
        <p>Fill the form below to support a school campaign.</p>
      </div>
      <DonationForm />
    </section>
  );
}

export default Donate;
