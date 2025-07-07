import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

type Session = {
  id: number;
  topic?: string;
  scheduledAt: string;
  feedback?: string;
  mentor: { firstName: string; lastName: string };
  mentee: { firstName: string; lastName: string };
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resUsers, resSessions] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/admin/sessions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (resUsers.ok) {
          const usersData = await resUsers.json();
          setUsers(usersData);
        }

        if (resSessions.ok) {
          const sessionData = await resSessions.json();
          setSessions(sessionData);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading admin data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const deleteUser  = async (userId: number) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setUsers(users.filter(user => user.id !== userId));
    } else {
      console.error("Failed to delete user");
    }
  };

  const deleteSession = async (sessionId: number) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setSessions(sessions.filter(session => session.id !== sessionId));
    } else {
      console.error("Failed to delete session");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <Topbar />
      <div className="ml-0 sm:ml-64 p-6 w-full space-y-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>

        {loading ? (
          <p>Loading users and sessions...</p>
        ) : (
          <>
            <section>
              <h3 className="text-xl font-semibold mb-2">All Users</h3>
              <table className="min-w-full bg-white rounded shadow">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Role</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="py-2 px-4 border-b">{u.firstName} {u.lastName}</td>
                      <td className="py-2 px-4 border-b">{u.email}</td>
                      <td className="py-2 px-4 border-b">{u.role}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => deleteUser (u.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">All Sessions</h3>
              <ul className="bg-white p-4 rounded shadow space-y-4">
                {sessions.map((s) => (
                  <li key={s.id} className="border-b pb-2">
                    <div>
                      <strong>Topic:</strong> {s.topic || "N/A"}
                    </div>
                    <div>
                      <strong>Scheduled:</strong>{" "}
                      {new Date(s.scheduledAt).toLocaleString()}
                    </div>
                    <div>
                      <strong>Mentee:</strong> {s.mentee.firstName} {s.mentee.lastName}
                    </div>
                    <div>
                      <strong>Mentor:</strong> {s.mentor.firstName} {s.mentor.lastName}
                    </div>
                    <div>
                      <strong>Feedback:</strong>{" "}
                      <em>{s.feedback || "Not provided"}</em>
                    </div>
                    <button
                      onClick={() => deleteSession(s.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete Session
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
