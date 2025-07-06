import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

type RequestType = {
  id: number;
  mentor: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  status: string;
  createdAt: string;
};

export default function MenteeSentRequests() {
  const [requests, setRequests] = useState<RequestType[]>([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchSentRequests = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/requests/sent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) setRequests(data);
  };

  useEffect(() => {
    fetchSentRequests();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-0 sm:ml-64 w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Sent Requests</h2>
          <button
            onClick={fetchSentRequests}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        {requests.length === 0 ? (
          <p className="text-gray-600">You haven't sent any mentorship requests yet.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <li key={req.id} className="bg-white p-4 rounded shadow space-y-1">
                <p>
                  <strong>Mentor:</strong> {req.mentor.firstName} {req.mentor.lastName} (
                  {req.mentor.email})
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    className={
                      req.status === 'PENDING'
                        ? 'text-yellow-600'
                        : req.status === 'ACCEPTED'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {req.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Sent on {new Date(req.createdAt).toLocaleDateString()}
                </p>

                {req.status === 'ACCEPTED' && (
                  <button
                    onClick={() => navigate(`/sessions/book/${req.mentor.id}`)}
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Book Session
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
