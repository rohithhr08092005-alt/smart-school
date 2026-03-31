function ProgressBar({ value, max }) {
  const ratio = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div className="progress-wrap" aria-label="Donation progress">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${ratio}%` }} />
      </div>
      <p className="progress-text">{ratio}% funded</p>
    </div>
  );
}

export default ProgressBar;
