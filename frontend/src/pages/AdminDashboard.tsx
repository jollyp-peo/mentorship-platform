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
          fetch("http://localhost:5000/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/admin/sessions", {
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
              <ul className="bg-white p-4 rounded shadow space-y-2">
                {users.map((u) => (
                  <li key={u.id}>
                    {u.firstName} {u.lastName} ({u.email}) —{" "}
                    <span className="text-blue-700 font-medium">{u.role}</span>
                  </li>
                ))}
              </ul>
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
                      <strong>Mentee:</strong> {s.mentee.firstName}{" "}
                      {s.mentee.lastName}
                    </div>
                    <div>
                      <strong>Mentor:</strong> {s.mentor.firstName}{" "}
                      {s.mentor.lastName}
                    </div>
                    <div>
                      <strong>Feedback:</strong>{" "}
                      <em>{s.feedback || "Not provided"}</em>
                    </div>
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
