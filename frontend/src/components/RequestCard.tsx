type RequestCardProps = {
  mentor: {
    firstName: string;
    lastName: string;
    email: string;
  };
  status: string;
  createdAt: string;
};

export default function RequestCard({ mentor, status, createdAt }: RequestCardProps) {
  const statusColor =
    status === 'PENDING'
      ? 'text-yellow-600'
      : status === 'ACCEPTED'
      ? 'text-green-600'
      : 'text-red-600';

  return (
    <div className="bg-white p-4 rounded shadow">
      <p>
        <strong>To:</strong> {mentor.firstName} {mentor.lastName} ({mentor.email})
      </p>
      <p>
        <strong>Status:</strong> <span className={statusColor}>{status}</span>
      </p>
      <p className="text-sm text-gray-500">
        Sent on {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
