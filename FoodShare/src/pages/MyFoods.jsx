import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import FoodCard from "../components/FoodCard";

export default function MyListings() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchMyFoods = async () => {
      const snap = await getDocs(collection(db, "foods"));

      const data = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((f) => f.userId === auth.currentUser?.uid);

      setFoods(data);
    };

    fetchMyFoods();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "foods", id));
    setFoods((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div>
      <h2>My Listings</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}