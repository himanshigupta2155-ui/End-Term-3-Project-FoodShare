🍱 FoodShare – Food Waste Reduction Platform
📌 Problem Statement

Food waste is a major real-world problem where surplus food often gets discarded while many people still lack access to meals.

FoodShare is a web platform that connects people who have extra food with those who need it, helping reduce food waste and promote food redistribution.

🎯 Objective

To build a real-world system that:

Reduces food wastage
Enables food donation and claiming system
Connects donors and receivers efficiently
Uses authentication and cloud database for real-time updates
👥 Users
🍽️ Food Donors → People/Restaurants who post surplus food
🤝 Food Seekers → Users who claim available food
🔐 Authenticated Users → Secure access via login/signup
✨ Features
🔐 Authentication
Email/Password Login
Google Sign-In (Firebase Auth)
Protected Routes
🍱 Food Management (CRUD)
Add Food Listings
View Food Dashboard
Delete Food Items
Update Claim Status
📦 Claim System
Users can claim available food
Claim data stored in Firestore (claims collection)
Food status updates to claimed
🔍 Smart Filtering
Search by food name or location
Filter by location
Filter by urgency (low / medium / high)
📊 Dashboard
Displays all available food items
Real-time updates from Firebase
Empty state handling
♻️ Social Impact
Helps reduce food waste
Encourages redistribution of surplus food
🛠️ Tech Stack
Frontend
React.js
React Router
Tailwind CSS
Backend / Database
Firebase Authentication
Firestore Database
📁 Project Structure
/src
 ├── components
 │     ├── FoodCard.jsx
 │     ├── NavBar.jsx
 ├── pages
 │     ├── Dashboard.jsx
 │     ├── AddFood.jsx
 │     ├── MyFoods.jsx
 │     ├── Claims.jsx
 │     ├── Profile.jsx
       |___Analytics.jsx
 ├── services
 │     └── firebase.js
 ├── context
 ├── hooks
 └── App.js
🚀 How to Run Locally
1️⃣ Clone Repository
git clone https://github.com/your-username/foodshare.git
2️⃣ Install Dependencies
npm install
3️⃣ Add Firebase Config

Create .env file:

REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
4️⃣ Run Project
npm start
🔥 Key Firebase Collections
🍱 foods
{
  "title": "Rice Meal",
  "location": "Bangalore",
  "urgency": "high",
  "status": "available",
  "userId": "uid"
}
🤝 claims
{
  "foodId": "abc123",
  "claimedBy": "uid",
  "status": "claimed"
}
📌 Future Improvements
Real-time chat between donor & receiver
Map-based food discovery
AI-based food waste prediction
Notifications system
⚖️ Project Impact

This project contributes to:

Reducing food wastage
Helping needy individuals
Promoting sustainable food sharing
👨‍💻 Developer Notes

This project is built using React functional components and Firebase backend services. It demonstrates:

State management
CRUD operations
Authentication flow
Real-world problem solving
🏁 Final Note

This project is not just a UI clone, but a real-world problem-solving application focused on food waste reduction and social impact.