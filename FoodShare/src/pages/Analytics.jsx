
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Analytics() {
  const [totalFoods, setTotalFoods] = useState(0);
  const [claimed, setClaimed] = useState(0);
  const [available, setAvailable] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "foods"));

      const data = snap.docs.map(doc => doc.data());

      setTotalFoods(data.length);
      setClaimed(data.filter(f => f.status === "claimed").length);
      setAvailable(data.filter(f => f.status !== "claimed").length);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">📊 Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

        <div className="p-4 bg-white shadow rounded text-center">
          <h2 className="text-lg font-semibold">Total Foods</h2>
          <p className="text-2xl">{totalFoods}</p>
        </div>

        <div className="p-4 bg-green-100 shadow rounded text-center">
          <h2 className="text-lg font-semibold">Available</h2>
          <p className="text-2xl">{available}</p>
        </div>

        <div className="p-4 bg-red-100 shadow rounded text-center">
          <h2 className="text-lg font-semibold">Claimed</h2>
          <p className="text-2xl">{claimed}</p>
        </div>

      </div>
    </div>
  );
}