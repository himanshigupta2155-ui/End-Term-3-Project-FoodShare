import { useNavigate } from "react-router-dom";

export default function FoodCard({ food, onDelete, onClaim }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-5 transition hover:shadow-xl hover:scale-[1.02] duration-200">

      <h2 className="text-xl font-bold text-gray-800">{food.title}</h2>

      <p className="text-gray-600 mt-1">🍽 Quantity: {food.quantity}</p>
      <p className="text-gray-600">📍 Location: {food.location}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => navigate(`/edit/${food.id}`)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(food.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
        {food.urgency === "high" && (
          <span className="text-red-600 font-bold">🔥 High Urgency</span>
        )}

        {food.urgency === "medium" && (
          <span className="text-yellow-600 font-semibold">⚡ Medium Urgency</span>
        )}

        <p className="text-gray-500">⏳ Expires in: {food.expiryTime}</p>
        {food.status !== "claimed" ? (
          <button
            disabled={food.status === "claimed"}
            className={`px-2 py-1 mt-2 ${food.status === "claimed"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500"
              }`}
            onClick={() => onClaim(food)}
            
            
          >
            {food.status === "claimed" ? "Claimed" : "Claim"}
            
          </button>
        ) : (
          <span className="text-red-600 font-semibold">
            Claimed
          </span>
        )}
      </div>
    </div>
  );
}