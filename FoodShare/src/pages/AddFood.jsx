import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { auth } from "../services/firebase";

export default function AddFood() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const [urgency, setUrgency] = useState("medium");
  const [expiryTime, setExpiryTime] = useState("6h");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddFood = async () => {
    if (!title.trim() || !quantity.trim() || !location.trim()) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await addDoc(collection(db, "foods"), {
        title,
        quantity,
        location,
        urgency,
        expiryTime,
        status: "available",
        createdAt: new Date(),
         userId: auth.currentUser?.uid, 
      });

      setTitle("");
      setLocation("");
      setQuantity("");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

     
      <NavBar />

      <div className="flex items-center justify-center mt-10">

        <div className="bg-white p-6 rounded shadow w-96">

          <h2 className="text-xl font-bold mb-4">Add Food</h2>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Food title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
          >
            <option value="low">Low Urgency</option>
            <option value="medium">Medium Urgency</option>
            <option value="high">High Urgency 🔥</option>
          </select>

        
          <select
            value={expiryTime}
            onChange={(e) => setExpiryTime(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
          >
            <option value="2h">2 Hours</option>
            <option value="6h">6 Hours</option>
            <option value="24h">24 Hours</option>
          </select>

          <button
            className="w-full bg-green-500 text-white p-2 rounded"
            onClick={handleAddFood}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Food"}
          </button>

        </div>
      </div>
    </div>
  );
}