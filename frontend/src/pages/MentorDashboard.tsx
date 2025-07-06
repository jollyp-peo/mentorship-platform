import { useNavigate } from 'react-router-dom';

export default function MentorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-semibold mb-2">Mentorship Requests</h3>
        <p className="text-sm text-gray-600 mb-4">
          View and respond to mentorship requests from mentees.
        </p>
        <button
          onClick={() => navigate("/inbox")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Inbox
        </button>
      </div>
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-semibold mb-2">Your Sessions</h3>
        <p className="text-sm text-gray-600 mb-4">
          View all your upcoming and past sessions.
        </p>
        <button
          onClick={() => navigate("/sessions")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View Sessions
        </button>
      </div>
    </div>
  );
}

