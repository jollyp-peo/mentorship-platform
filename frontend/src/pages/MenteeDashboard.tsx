import { useNavigate } from 'react-router-dom';

export default function MenteeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-semibold mb-2">Browse Mentors</h3>
        <p className="text-sm text-gray-600 mb-4">
          Explore available mentors and send mentorship requests.
        </p>
        <button
          onClick={() => navigate("/mentors")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Find Mentors
        </button>
      </div>
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-semibold mb-2">My Sessions</h3>
        <p className="text-sm text-gray-600 mb-4">
          Track your booked sessions and provide feedback.
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
