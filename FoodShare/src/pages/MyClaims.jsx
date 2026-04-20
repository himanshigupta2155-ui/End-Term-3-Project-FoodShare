import { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";

import FoodCard from "../components/FoodCard";

export default function MyClaims() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        
        const q = query(
          collection(db, "claims"),
          where("claimedBy", "==", auth.currentUser.uid)
        );

        const snap = await getDocs(q);

        const claims = snap.docs.map((d) => d.data());

      
        const foodPromises = claims.map(async (c) => {
          const foodSnap = await getDoc(doc(db, "foods", c.foodId));

          if (foodSnap.exists()) {
            return {
              id: foodSnap.id,
              ...foodSnap.data(),
              claimedAt: c.createdAt,
            };
          }
          return null;
        });

        const foodData = (await Promise.all(foodPromises)).filter(Boolean);

        setFoods(foodData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClaims();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Claims</h2>

      {foods.length === 0 ? (
        <p>No claimed food yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
}