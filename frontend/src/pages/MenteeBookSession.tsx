import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Slot = {
  id: number;
  day: string;
  from: string;
  to: string;
};

export default function MenteeBookSession() {
  const { mentorId } = useParams<{ mentorId: string }>();
  const [availability, setAvailability] = useState<Slot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
  const fetchAvailability = async () => {
    if (!mentorId) return;

    const res = await fetch(`http://localhost:5000/availability?mentorId=${mentorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    console.log("Fetched slots:", data);
    if (res.ok) setAvailability(data);
  };

  fetchAvailability();
}, [mentorId]);

  const handleBooking = async () => {
    if (!selectedSlotId || !topic || !mentorId) {
      alert("Please select a time slot and enter a topic.");
      return;
    }

    const selectedSlot = availability.find((s) => s.id === selectedSlotId);
    if (!selectedSlot) {
      alert("Invalid slot selected.");
      return;
    }

    // Assume booking for today at the selected time (for demo)
    const slotDate = new Date();
    slotDate.setHours(Number(selectedSlot.from.split(":")[0]));
    slotDate.setMinutes(Number(selectedSlot.from.split(":")[1]));
    slotDate.setSeconds(0);

    try {
      const res = await fetch("http://localhost:5000/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mentorId: Number(mentorId),
          topic,
          scheduledAt: slotDate.toISOString(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Session booked!");
        navigate("/sessions");
      } else {
        alert(data.message || "Failed to book session");
      }
    } catch (err) {
      console.error(err);
      alert("Error while booking session.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Book a Session</h2>

      <label className="block">
        <span className="font-semibold">Choose an available time</span>
        <select
          className="border p-2 rounded mt-1 w-full"
          value={selectedSlotId || ""}
          onChange={(e) => setSelectedSlotId(Number(e.target.value))}
        >
          <option value="">-- Select a time slot --</option>
          
          {availability.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.day} — {slot.from} to {slot.to}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="font-semibold">Topic for this session</span>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-2 rounded w-full mt-1"
          placeholder="e.g. UI/UX portfolio review"
        />
      </label>

      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Book Session
      </button>
    </div>
  );
}
