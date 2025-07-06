import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MenteeMentorList from "./pages/MenteeMentorList";
import MenteeSentRequests from "./pages/MenteeSentRequests";
import MentorInbox from "./pages/MentorInbox";
import MentorAvailability from "./pages/MentorAvailability";
import MenteeBookSession from "./pages/MenteeBookSession";
import SessionList from "./pages/SessionList";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/login" />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			<Route
				path="/dashboard"
				element={
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				}
			/>

			<Route
				path="/dashboard/admin"
				element={
					<PrivateRoute>
						<AdminDashboard />
					</PrivateRoute>
				}
			/>

			<Route
				path="/mentors"
				element={
					<PrivateRoute>
						<MenteeMentorList />
					</PrivateRoute>
				}
			/>
			{/* show MentorInbox or MenteeSentRequests dynamically */}
			<Route
				path="/requests"
				element={
					<PrivateRoute>
						{localStorage.getItem("role") === "MENTOR" ? (
							<MentorInbox />
						) : (
							<MenteeSentRequests />
						)}
					</PrivateRoute>
				}
			/>

			<Route
				path="/inbox"
				element={
					<PrivateRoute>
						<MentorInbox />
					</PrivateRoute>
				}
			/>

			<Route
				path="/sessions"
				element={
					<PrivateRoute>
						<SessionList />
					</PrivateRoute>
				}
			/>
			<Route
				path="/sessions/book/:mentorId"
				element={
					<PrivateRoute>
						<MenteeBookSession />
					</PrivateRoute>
				}
			/>
			<Route
				path="/availability"
				element={
					<PrivateRoute>
						<MentorAvailability />
					</PrivateRoute>
				}
			/>

			<Route
				path="/profile"
				element={
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				}
			/>
			<Route
				path="/profile/edit"
				element={
					<PrivateRoute>
						<EditProfile />
					</PrivateRoute>
				}
			/>
			<Route
				path="/settings"
				element={
					<PrivateRoute>
						<Settings />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
}
