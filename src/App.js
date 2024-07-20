import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import routes from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoute";
import { googleMapsApiKey } from "./Utils/constants";

function App() {
  return (
    <div>
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`}
        async
        defer
      ></script>
      <Header />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute>{route.element}</ProtectedRoute>
              ) : (
                route.element
              )
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
