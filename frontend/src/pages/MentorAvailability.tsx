import { useEffect, useState } from "react";
type Slot = {
  id: number;
  day: string;
  from: string;
  to: string;
};

export default function MentorAvailability() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [day, setDay] = useState("Monday");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const token = localStorage.getItem("token");

  const fetchSlots = async () => {
    const res = await fetch("http://localhost:5000/availability", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setSlots(data);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const addSlot = async () => {
    const res = await fetch("http://localhost:5000/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ day, from, to }),
    });

    const data = await res.json();
    if (res.ok) {
      setSlots((prev) => [...prev, data]);
      setFrom("");
      setTo("");
      alert("Slot added!");
    } else {
      alert(data.message || "Failed to add slot");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Set Your Availability</h2>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
            (d) => (
              <option key={d} value={d}>
                {d}
              </option>
            )
          )}
        </select>

        <input
          type="time"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
          placeholder="From"
        />

        <input
          type="time"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
          placeholder="To"
        />
      </div>

      <button
        onClick={addSlot}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Slot
      </button>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2">Your Current Availability</h3>
        <ul className="space-y-2">
          {slots.length === 0 ? (
            <p className="text-gray-600">No slots added yet.</p>
          ) : (
            slots.map((slot: any) => (
              <li
                key={slot.id}
                className="border rounded p-2 flex justify-between items-center"
              >
                <span>
                  <strong>{slot.day}</strong> — {slot.from} to {slot.to}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
