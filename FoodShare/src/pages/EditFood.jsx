import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditFood() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "foods", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setQuantity(data.quantity);
          setLocation(data.location);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); 
  }, [id]); 

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "foods", id), { 
        title,
        quantity,
        location,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Food</h2>

      <input
        className="border p-2 mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 mb-2 w-full"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input
        className="border p-2 mb-2 w-full"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
}