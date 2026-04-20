
import { useState, useEffect } from "react";
import { db, auth } from "../services/firebase";
import {
  collection,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import FoodCard from "../components/FoodCard";
import NavBar from "../components/NavBar";

export default function Dashboard() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterByLocation, setFilterByLocation] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "foods"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFoods(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);


  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "foods", id));
  };

  
  const handleClaim = async (food) => {
    if (!auth.currentUser) {
      alert("Please login first");
      return;
    }

    if (food.status === "claimed") {
      alert("Already claimed");
      return;
    }

    await addDoc(collection(db, "claims"), {
      foodId: food.id,
      foodName: food.title,
      claimedBy: auth.currentUser.uid,
      ownerId: food.userId,
      status: "claimed",
      createdAt: new Date(),
    });

    await updateDoc(doc(db, "foods", food.id), {
      status: "claimed",
      claimedBy: auth.currentUser.uid,
    });
  };

  const filteredFoods = foods.filter((food) => {
    const q = search.toLowerCase();

    const matchesSearch =
      food.title?.toLowerCase().includes(q) ||
      food.location?.toLowerCase().includes(q);

    const matchesLocation =
      filterByLocation === "all" ||
      food.location?.toLowerCase() === filterByLocation.toLowerCase();

    const matchesUrgency =
      urgencyFilter === "all" || food.urgency === urgencyFilter;

    return matchesSearch && matchesLocation && matchesUrgency;
  });
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const locations = [...new Set(foods.map((f) => f.location).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <div className="max-w-6xl mx-auto px-4 py-6">

        <input
          placeholder="Search food or location..."
          className="border p-2 w-full mb-3 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-3 mb-4 flex-wrap">

          <select
            value={filterByLocation}
            onChange={(e) => setFilterByLocation(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All Locations</option>
            {locations.map((loc, i) => (
              <option key={i} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All Urgency</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High 🔥</option>
          </select>

        </div>

        {filteredFoods.length === 0 ? (
          <div className="text-center mt-20">
            <div className="text-6xl">🍽️</div>
            <h2 className="text-xl font-semibold mt-3">
              No food found
            </h2>
            <p className="text-gray-500">
              Try changing search or filter
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onDelete={handleDelete}
                onClaim={handleClaim}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}