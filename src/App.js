import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import routes from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div>
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
