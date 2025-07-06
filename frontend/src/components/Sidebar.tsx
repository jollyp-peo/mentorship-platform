import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type User = {
	firstName: string;
	role: 'MENTOR' | 'MENTEE' | 'ADMIN';
};

export default function Sidebar() {
	const [user, setUser] = useState<User | null>(null);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProfile = async () => {
			const token = localStorage.getItem("token");
			if (!token) return;

			const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			const data = await res.json();
			if (res.ok) setUser(data);
		};

		fetchProfile();
	}, []);

	const logout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	const navItem = (to: string, label: string) => (
		<Link
			to={to}
			className={`block px-4 py-2 rounded hover:bg-blue-100 ${
				location.pathname === to ? "bg-blue-200 font-semibold" : ""
			}`}
		>
			{label}
		</Link>
	);

	if (!user) return null;
  const goHome = () => {
    if (!user) return;
    if (user.role === 'MENTEE') navigate('/dashboard');
    else if (user.role === 'MENTOR') navigate('/dashboard');
    else if (user.role === 'ADMIN') navigate('/dashboard/admin');
  };

	return (
		<div className="bg-white shadow h-screen w-64 fixed top-0 left-0 hidden sm:block">
			<div
				onClick={goHome}
				className="p-4 border-b cursor-pointer hover:bg-gray-100 rounded"
				title="Go to your dashboard"
			>
				<h2 className="text-lg font-bold">Welcome, {user.firstName}</h2>
				<p className="text-sm text-gray-500">{user.role}</p>
			</div>

			<nav className="p-4 space-y-2">
				{user.role === "MENTEE" && (
					<>
						{navItem("/mentors", "Browse Mentors")}
						{navItem("/requests", "Sent Requests")}
						{/* {navItem("/sessions/book/:mentorId", "Book Session")} */}
						{navItem("/sessions", "My Sessions")}
					</>
				)}
				{user.role === "MENTOR" && (
					<>
						{navItem("/inbox", "Inbox")}
						{navItem("/availability", "Availablity")}
						{navItem("/sessions", "My Sessions")}
					</>
				)}
				{user.role === "ADMIN" && (
					<>{navItem("/dashboard/admin", "Admin Panel")}</>
				)}
				<button
					onClick={logout}
					className="block w-full text-left px-4 py-2 rounded text-red-600 hover:bg-red-100"
				>
					Logout
				</button>
			</nav>
		</div>
	);
}
