import { useEffect, useState } from "react";

const skills = [
  "Marketing", "UI/UX", "Product Design", "Backend", "Frontend", "Data Science",
];

type Mentor = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  skills?: string;
};

export default function MenteeMentorList() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMentors();
  }, [selectedSkill]);

  const fetchMentors = async () => {
    let url = "http://localhost:5000/users?role=MENTOR";
    if (selectedSkill) url += `&skill=${selectedSkill}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setMentors(data);
  };

  const sendRequest = async (mentorId: number) => {
    const res = await fetch("http://localhost:5000/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mentorId }),
    });

    const data = await res.json();
    if (res.ok) alert("Request sent!");
    else alert(data.message || "Request failed");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Browse Mentors</h2>

      <label className="block mb-4">
        <span className="font-semibold">Filter by Skill</span>
        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="p-2 border rounded w-full mt-1"
        >
          <option value="">-- All Skills --</option>
          {skills.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>

      {mentors.length === 0 ? (
        <p className="text-gray-600">No mentors found.</p>
      ) : (
        <ul className="space-y-4">
          {mentors.map((mentor) => (
            <li key={mentor.id} className="bg-white shadow p-4 rounded">
              <h3 className="text-lg font-semibold">
                {mentor.firstName} {mentor.lastName}
              </h3>
              <p><strong>Email:</strong> {mentor.email}</p>
              <p><strong>Bio:</strong> {mentor.bio || "N/A"}</p>
              <p><strong>Skills:</strong> {mentor.skills || "N/A"}</p>
              <button
                onClick={() => sendRequest(mentor.id)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Request Mentorship
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
