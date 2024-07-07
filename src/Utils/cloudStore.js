import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD_V2Roidf3ZOwOtCObp6AODT8praMY-wQ",
  authDomain: "quick-bite-a926c.firebaseapp.com",
  projectId: "quick-bite-a926c",
  storageBucket: "quick-bite-a926c.appspot.com",
  messagingSenderId: "508976986685",
  appId: "1:508976986685:web:78f253540e3e4f63e60854",
  measurementId: "G-KWDF0115CW",
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mock data for Firestore
const mockRestaurants = [
  {
    id: "1",
    name: "The Great Indian Restaurant",
    address: "123 Main St, Mumbai",
    rating: 4.5,
    cuisine: "Indian",
    image: "https://images.unsplash.com/photo-1605248895273-3d213f8a47ae",
  },
  // Add more mock data as needed
];

const mockFoods = [
  {
    id: "1",
    restaurantId: "1",
    name: "Chicken Curry",
    description: "Spicy chicken curry with herbs",
    price: 200,
    image: "https://images.unsplash.com/photo-1608262043048-9ed2b40fa65c",
  },
  // Add more mock data as needed
];

// Function to insert mock data into Firestore
const insertMockDataToFirestore = async () => {
  try {
    // Insert mock restaurants
    await Promise.all(
      mockRestaurants.map(async (restaurant) => {
        await addDoc(collection(db, "restaurants"), restaurant);
      })
    );

    // Insert mock foods
    await Promise.all(
      mockFoods.map(async (food) => {
        await addDoc(collection(db, "foods"), food);
      })
    );

    console.log("Mock data inserted into Firestore successfully!");
  } catch (error) {
    console.error("Error inserting mock data into Firestore:", error.message);
  }
};

// Function to access mock data from Firestore
const accessDataFirestore = async () => {
  try {
    // Access and log mock restaurants
    const restaurantsSnapshot = await getDocs(collection(db, "restaurants"));
    console.log("Mock Restaurants:");
    restaurantsSnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });

    // Access and log mock foods
    const foodsSnapshot = await getDocs(collection(db, "foods"));
    console.log("Mock Foods:");
    foodsSnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error accessing mock data from Firestore:", error.message);
  }
};

// Function to delete all mock data from Firestore
const deleteAllDataFirestore = async () => {
  try {
    // Delete all documents in 'restaurants' collection
    const restaurantsSnapshot = await getDocs(collection(db, "restaurants"));
    restaurantsSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // Delete all documents in 'foods' collection
    const foodsSnapshot = await getDocs(collection(db, "foods"));
    foodsSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    console.log("All data deleted from Firestore successfully!");
  } catch (error) {
    console.error("Error deleting data from Firestore:", error.message);
  }
};

// Uncomment the function calls as needed
// insertMockDataToFirestore();
// accessDataFirestore();
// deleteAllDataFirestore();

export {
  insertMockDataToFirestore,
  accessDataFirestore,
  deleteAllDataFirestore,
};
