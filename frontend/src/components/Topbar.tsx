import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  firstName: string;
  role: 'MENTOR' | 'MENTEE' | 'ADMIN';
};

export default function Topbar() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:5000/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) setUser(data);
    };

    fetchUser();
  }, []);

  const goHome = () => {
    if (!user) return;
    if (user.role === 'MENTEE') navigate('/dashboard');
    else if (user.role === 'MENTOR') navigate('/dashboard');
    else if (user.role === 'ADMIN') navigate('/dashboard/admin');
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 sm:left-64 right-0 bg-white shadow h-16 flex items-center justify-end px-6 z-10">
      {user && (
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
            title="Menu"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              {user.firstName[0]}
            </div>
            <span className="hidden sm:inline text-gray-700 font-medium">
              {user.firstName}
            </span>
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded text-sm z-20">
              <button
                onClick={goHome}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </button>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
