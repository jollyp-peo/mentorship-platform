import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import IncomingRequestCard from '../components/IncomingRequestCard';

type RequestType = {
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
};

export default function MentorInbox() {
  const [requests, setRequests] = useState<RequestType[]>([]);
  const token = localStorage.getItem('token');

  const fetchRequests = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/requests/received`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setRequests(data);
  };

  const handleAction = async (id: number, action: 'ACCEPTED' | 'REJECTED') => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/requests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: action }),
    });

    if (res.ok) {
      fetchRequests(); // Refresh list
    } else {
      alert('Failed to update request');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-0 sm:ml-64 p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Incoming Requests</h2>
        {requests.length === 0 ? (
          <p className="text-gray-600">No mentorship requests received yet.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <IncomingRequestCard
                key={req.id}
                id={req.id}
                mentee={req.mentee}
                status={req.status}
                createdAt={req.createdAt}
                onAction={handleAction}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

