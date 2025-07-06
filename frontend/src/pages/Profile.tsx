import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({
    bio: "",
    skills: "",
    goals: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setProfile({
          bio: data.bio || "N/A",
          skills: data.skills || "N/A",
          goals: data.goals || "N/A",
        });
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white shadow rounded p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-2">My Profile</h2>
        
        <div>
          <p className="font-semibold">Bio:</p>
          <p className="text-gray-700">{profile.bio}</p>
        </div>

        <div>
          <p className="font-semibold">Skills:</p>
          <p className="text-gray-700">{profile.skills}</p>
        </div>

        <div>
          <p className="font-semibold">Goals:</p>
          <p className="text-gray-700">{profile.goals}</p>
        </div>

        <button
          onClick={() => navigate("/profile/edit")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
