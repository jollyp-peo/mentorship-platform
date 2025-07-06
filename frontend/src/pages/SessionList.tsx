import { useEffect, useState } from "react";

type Session = {
  id: number;
  topic?: string;
  scheduledAt: string;
  feedback?: string;
  mentor?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  mentee?: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export default function SessionList() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [role, setRole] = useState<string>("");
  const [feedbackMap, setFeedbackMap] = useState<{ [key: number]: string }>({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchSessions = async () => {
      const profileRes = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profile = await profileRes.json();
      setRole(profile.role);

      const endpoint =
        profile.role === "MENTEE"
          ? `${import.meta.env.VITE_API_URL}/sessions/mentee`
          : `${import.meta.env.VITE_API_URL}/sessions/mentor`;

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) setSessions(data);
    };

    fetchSessions();
  }, []);

  const handleFeedbackChange = (sessionId: number, value: string) => {
    setFeedbackMap({ ...feedbackMap, [sessionId]: value });
  };

  const submitFeedback = async (sessionId: number) => {
    const feedback = feedbackMap[sessionId];
    if (!feedback) return alert("Feedback is empty.");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}/feedback`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ feedback }),
    });

    if (res.ok) {
      alert("Feedback submitted!");
      setSessions((prev) =>
        prev.map((s) => (s.id === sessionId ? { ...s, feedback } : s))
      );
      setFeedbackMap((prev) => ({ ...prev, [sessionId]: "" }));
    } else {
      alert("Failed to submit feedback");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Your Sessions</h2>

      {sessions.length === 0 ? (
        <p className="text-gray-600">No sessions found.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li key={session.id} className="bg-white shadow p-4 rounded border">
              <p>
                <strong>Topic:</strong> {session.topic || "N/A"}
              </p>
              <p>
                <strong>Scheduled At:</strong>{" "}
                {new Date(session.scheduledAt).toLocaleString()}
              </p>

              {role === "MENTEE" && session.mentor && (
                <>
                  <p>
                    <strong>Mentor:</strong> {session.mentor.firstName}{" "}
                    {session.mentor.lastName} ({session.mentor.email})
                  </p>
                  <p>
                    <strong>Feedback:</strong> {session.feedback || "No feedback yet"}
                  </p>
                </>
              )}

              {role === "MENTOR" && session.mentee && (
                <>
                  <p>
                    <strong>Mentee:</strong> {session.mentee.firstName}{" "}
                    {session.mentee.lastName} ({session.mentee.email})
                  </p>

                  {session.feedback ? (
                    <p>
                      <strong>Feedback:</strong> {session.feedback}
                    </p>
                  ) : (
                    <div className="space-y-2 mt-2">
                      <textarea
                        className="w-full border p-2 rounded"
                        rows={3}
                        placeholder="Enter feedback..."
                        value={feedbackMap[session.id] || ""}
                        onChange={(e) =>
                          handleFeedbackChange(session.id, e.target.value)
                        }
                      />
                      <button
                        onClick={() => submitFeedback(session.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
