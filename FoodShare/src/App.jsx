import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import AddFood from "./pages/AddFood";
import EditFood from "./pages/EditFood";
import Analytics from "./pages/Analytics";
import MyFoods from "./pages/MyFoods";
import Profile from "./pages/Profile";
import About from "./pages/About";
import MyClaims from "./pages/MyClaims"

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Auth />} />

       
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddFood />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditFood />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route
          path="/my-foods"
          element={
            <ProtectedRoute>
              <MyFoods />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-claims"
          element={
            <ProtectedRoute>
              <MyClaims />
            </ProtectedRoute>
          }
        />
        <Route path="/myClaims" element={<MyClaims />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;