import{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {auth} from "../services/firebase";
import{Link} from "react-router-dom";

<Link to="/my-listings" className="mr-4">
<Link to="/profile">Profile</Link>
  My Listings
</Link>


export default function NavBar() {
  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white shadow-md">

   
      <h1 className="text-xl font-bold">🍱 FoodShare</h1>

     
      <div className="flex gap-6 text-gray-700 font-medium">

        <Link to="/dashboard" className="hover:text-blue-500">
          Home
        </Link>

        <Link to="/add" className="hover:text-blue-500">
          Add Food
        </Link>

        <Link to="/my-foods" className="hover:text-blue-500">
          My Foods
        </Link>

        <Link to="/my-claims" className="hover:text-blue-500">
          My Claims
        </Link>

        <Link to="/profile" className="hover:text-blue-500">
          Profile
        </Link>
        <Link to="/analytics">Analytics</Link>

      </div>
    </div>
  );
}
