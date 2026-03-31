import { useState } from 'react';

function DonationForm() {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    message: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Placeholder submit flow for frontend-only starter.
    alert(`Thank you ${formData.name || 'donor'} for supporting this school.`);
    setFormData({ name: '', amount: '', message: '' });
  }

  return (
    <form className="card donation-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Your Name</label>
      <input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        required
      />

      <label htmlFor="amount">Donation Amount</label>
      <input
        id="amount"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Enter amount"
        type="number"
        min="1"
        required
      />

      <label htmlFor="message">Message (Optional)</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Write a short message"
        rows="4"
      />

      <button className="btn btn-primary" type="submit">
        Confirm Donation
      </button>
    </form>
  );
}

export default DonationForm;
