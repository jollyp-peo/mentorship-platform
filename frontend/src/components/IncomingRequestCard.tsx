

type IncomingRequestCardProps = {
  id: number;
  mentee: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    goals?: string;
  };
  status: string;
  createdAt: string;
  onAction: (id: number, action: 'ACCEPTED' | 'REJECTED') => void;
};


export default function IncomingRequestCard({
  id,
  mentee,
  status,
  createdAt,
  onAction,
}: IncomingRequestCardProps) {
  // const [formVisible, setFormVisible] = useState(false);
  // const [topic, setTopic] = useState('');
  // const [scheduledAt, setScheduledAt] = useState('');
  // const token = localStorage.getItem('token');

  // const handleSchedule = async () => {
  //   const res = await fetch('http://localhost:5000/sessions', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       menteeId: mentee.id,
  //       topic,
  //       scheduledAt,
  //     }),
  //   });

  //   const data = await res.json();
  //   if (res.ok) {
  //     alert('Session scheduled!');
  //     setFormVisible(false);
  //   } else {
  //     alert(data.message || 'Failed to schedule session');
  //   }
  // };

  return (
    <div className="bg-white p-4 rounded shadow">
      <p>
        <strong>From:</strong> {mentee.firstName} {mentee.lastName} ({mentee.email})
      </p>
      <p><strong>Goals:</strong> {mentee.goals || 'N/A'}</p>
      <p>
        <strong>Status:</strong>{' '}
        <span className={
          status === 'PENDING' ? 'text-yellow-600' :
          status === 'ACCEPTED' ? 'text-green-600' : 'text-red-600'
        }>
          {status}
        </span>
      </p>
      <p className="text-sm text-gray-500">
        Sent on {new Date(createdAt).toLocaleDateString()}
      </p>

      {status === 'PENDING' && (
        <div className="mt-3 flex gap-3">
          <button
            onClick={() => onAction(id, 'ACCEPTED')}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Accept
          </button>
          <button
            onClick={() => onAction(id, 'REJECTED')}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      )}

      {/* {status === 'ACCEPTED' && !formVisible && (
        <button
          onClick={() => setFormVisible(true)}
          className="mt-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Schedule Session
        </button>
      )} */}

      {/* {formVisible && (
        <div className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Topic"
            className="p-2 border rounded w-full"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <input
            type="datetime-local"
            className="p-2 border rounded w-full"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
          <button
            onClick={handleSchedule}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirm Schedule
          </button>
        </div>
      )} */}
    </div>
  );
}
