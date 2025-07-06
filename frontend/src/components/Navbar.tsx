import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
      <h1 className="text-xl font-bold text-blue-600 text-center sm:text-left">Mentorship Platform</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 self-center sm:self-auto"
      >
        Logout
      </button>
    </nav>
  );
}
