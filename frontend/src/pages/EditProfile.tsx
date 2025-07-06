import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const skillsList = [
  "Marketing", "UI/UX", "Product Design", "Backend", "Frontend", "Data Science"
];

export default function EditProfile() {
  const [form, setForm] = useState({
    bio: "",
    skills: [] as string[],
    goals: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setForm({
          bio: data.bio || "",
          skills: data.skills?.split(",") || [],
          goals: data.goals || "",
        });
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/users/me/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        skills: form.skills.join(","),
      }),
    });

    if (res.ok) {
      alert("Profile updated!");
      navigate("/profile");
    } else {
      alert("Failed to update.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Your Profile</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-blue-600 underline hover:text-blue-800"
        >
          ← Back to Dashboard
        </button>
      </div>

      <label className="block">
        <span className="font-semibold">Short Bio</span>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          rows={3}
        />
      </label>

      <div className="space-y-2">
        <span className="font-semibold">Skills (select multiple)</span>
        <div className="flex flex-wrap gap-2">
          {skillsList.map((skill) => (
            <button
              type="button"
              key={skill}
              className={`px-3 py-1 rounded border ${
                form.skills.includes(skill)
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="font-semibold">Goals</span>
        <input
          name="goals"
          value={form.goals}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
        />
      </label>

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Profile
      </button>
    </div>
  );
}
