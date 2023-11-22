import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <NavigationBar />
      <div className="bg-slate-300 m-0">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/events" element={<Events />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
