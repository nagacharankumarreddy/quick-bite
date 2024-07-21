# Quick Bite 🍔🍕🍜

Welcome to Quick Bite, where we believe in "Bite taste love".Our mission is to make online food ordering easy and enjoyable. Whether you crave a hearty meal, a light snack, or something sweet, we have it all.

## Features

### 1. User Authentication 🔒

- **Firebase Authentication**: Secure sign-in and sign-up processes.

### 2. Restaurant and Menu Browsing 🍽️

- **Restaurant List**: Users can browse through a list of partnered restaurants.
- **Menu Display**: Each restaurant's menu is displayed with options to add items to the cart.

### 3. Cart Management 🛒

- **Add to Cart**: Users can add multiple items from different restaurants to their cart.
- **Edit Cart**: Users can update item quantities or remove items from their cart.

### 4. Checkout Process 🏁

- **Order Summary**: Displays the items in the cart along with their quantities and total price.
- **Place Order**: Users can place an order, which is then confirmed via email.

### 5. Address Management 🏠

- **Add New Address**: Users can add new addresses for delivery.
- **Select Address**: Users can select from their saved addresses during checkout.
- **Delete Address**: Users can delete unwanted addresses.

### 6. Integration with Google Maps 🗺️

- **Pincode Lookup**: Users can enter a pincode to fetch localities using the Google Maps Geocoding API.
- **Address Autocomplete**: Helps users quickly fill out their address details.

### 7. Email Notifications 📧

- **Order Confirmation**: Sends a detailed order confirmation email to the user upon successful order placement.

## How to Run 🚀

1. **Clone the Repository 📋**

   ```bash
   git clone https://github.com/nagacharankumarreddy/quick-bite
   cd quick-bite

   ```

2. **Install Dependencies 📦**

   ```bash
   npm install

   ```

3. **Set Up Firebase🔥**

   Create a Firebase project at Firebase Console.
   Set up authentication and realtime database.
   Update the Firebase configuration in firebase.js.

4. **Set Up Google Maps API 🌐**

   Obtain a Google Maps API key from the Google Cloud Console.
   Update the API key in src/Utils/constants.js.

5. **Set Up Email Notifications ✉️**

   Use EMailJs as email service provider
   Create an email template for order confirmations.
   Update the email configuration in src/utils/sendEmailNotification.js with your email service provider's details.

6. **Start the Application ▶️**

   ```bash
   npm start
   ```

Feel free to contribute to the project by creating a pull request or reporting issues. Enjoy using Quick Bite and have a great meal! 🍽️
