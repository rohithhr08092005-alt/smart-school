function StatusBadge({ status }) {
  const normalized = status.toLowerCase().replace(' ', '-');

  return <span className={`status-badge status-${normalized}`}>{status}</span>;
}

export default StatusBadge;
