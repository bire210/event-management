import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import { useEffect } from "react";
import Private from "./context/Private";
function App() {
  return (
    <>
      <NavigationBar />
      <div className="bg-slate-300 m-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/events"
            element={
              <Private>
                <Events />
              </Private>
            }
          />
          <Route
            path="/bookings"
            element={
              <Private>
                <Booking />
              </Private>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
