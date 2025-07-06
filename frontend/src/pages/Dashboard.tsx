import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AdminDashboard from "./AdminDashboard";
import MenteeDashboard from "./MenteeDashboard";
import MentorDashboard from "./MentorDashboard";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchProfile = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <Topbar />
      <div className="ml-0 sm:ml-64 w-full p-6 space-y-6">
        <h2 className="text-2xl font-bold">Welcome, {user.firstName}!</h2>

        {user.role === "MENTOR" && <MentorDashboard />}
        {user.role === "MENTEE" && <MenteeDashboard />}
        {user.role === "ADMIN" && <AdminDashboard />}
      </div>
    </div>
  );
}
