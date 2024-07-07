import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove } from "firebase/database";

// Initialize Firebase app and Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyD_V2Roidf3ZOwOtCObp6AODT8praMY-wQ",
  authDomain: "quick-bite-a926c.firebaseapp.com",
  projectId: "quick-bite-a926c",
  storageBucket: "quick-bite-a926c.appspot.com",
  messagingSenderId: "508976986685",
  appId: "1:508976986685:web:78f253540e3e4f63e60854",
  measurementId: "G-KWDF0115CW",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to insert mock data into Realtime Database
const insertMockDataToRealtimeDatabase = async () => {
  try {
    // Insert mock restaurants into 'restaurants' node
    await Promise.all(
      mockRestaurants.map(async (restaurant) => {
        await set(ref(db, `restaurants/${restaurant.id}`), restaurant);
      })
    );

    // Insert mock foods into 'foods' node
    // await Promise.all(
    //   mockFoods.map(async (food) => {
    //     await set(ref(db, `foods/${food.id}`), food);
    //   })
    // );

    console.log("Mock data inserted into Realtime Database successfully!");
  } catch (error) {
    console.error(
      "Error inserting mock data into Realtime Database:",
      error.message
    );
  }
};

// Function to access  data from Realtime Database
const accessDataRealtimeDatabase = async () => {
  try {
    // Access and log  restaurants
    const restaurants = (await get(ref(db, `restaurants/`))).val();
    await Promise.all(
      Object.keys(restaurants).map(async (restaurantId) => {
        const snapshot = await get(ref(db, `restaurants/${restaurantId}`));
        if (snapshot.exists()) {
          console.log("Restaurant:", snapshot.val());
        } else {
          console.log("No data available for Restaurant:", restaurant.id);
        }
      })
    );
  } catch (error) {
    console.error(
      "Error accessing data from Realtime Database:",
      error.message
    );
  }
};

// Function to delete all data from Realtime Database
const deleteAllDataRealtimeDatabase = async () => {
  try {
    // Delete all 'restaurants' node
    await remove(ref(db, "restaurants"));

    // Delete all 'foods' node
    await remove(ref(db, "foods"));

    console.log("All data deleted from Realtime Database successfully!");
  } catch (error) {
    console.error("Error deleting data from Realtime Database:", error.message);
  }
};

// Uncomment the function calls as needed
// insertMockDataToRealtimeDatabase();
accessDataRealtimeDatabase();
// deleteAllDataRealtimeDatabase();

export {
  insertMockDataToRealtimeDatabase,
  accessDataRealtimeDatabase,
  deleteAllDataRealtimeDatabase,
};
