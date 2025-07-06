import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "MENTEE",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>
        <input
          name="firstName"
          onChange={handleChange}
          className="p-2 border rounded w-full"
          placeholder="First Name"
          required
        />
        <input
          name="lastName"
          onChange={handleChange}
          className="p-2 border rounded w-full"
          placeholder="Last Name"
          required
        />
        <input
          name="email"
          onChange={handleChange}
          className="p-2 border rounded w-full"
          placeholder="Email"
          type="email"
          required
        />
        <input
          name="password"
          onChange={handleChange}
          className="p-2 border rounded w-full"
          placeholder="Password"
          type="password"
          required
        />
        <select
          name="role"
          onChange={handleChange}
          className="p-2 border rounded w-full"
        >
          <option value="MENTEE">Mentee</option>
          <option value="MENTOR">Mentor</option>
        </select>
        <button className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
}
