import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ResultPage from "./pages/ResultPage";
import Hero from "./components/Hero";
import FilteredPredictions from "./pages/FilteredPredictions";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Authentication from "./pages/Authentication";
import Settings from "./pages/Settings";
import DetectedImage from "./pages/DetectedImage";
import OriginalImages from "./pages/OriginalImages";
import SegmentedImages from "./pages/SegmentedImages";
import Location from "./pages/Location";
import Stroage from "./pages/Stroage";
import Register from "./pages/Register";
import RootLayout from "./layouts/RootLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <ToastContainer position="top-right" autoClose={50000} />;
    <Navbar /> {/* Place AuthProvider outside of Routes */}
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/result/:id" element={<ResultPage />} />
      <Route path="/hero" element={<Hero />} />
      <Route path="/predictions" element={<FilteredPredictions />} />
      <Route path="/admindashboard" element={<RootLayout />} />
      {/* <PrivateRoute path="/post" element={<Post />} /> */}
      <Route path="/Login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/settting" element={<Settings />} />
      <Route path="/detectedImage" element={<DetectedImage />} />
      <Route path="/originalImage" element={<OriginalImages />} />
      <Route path="/segmentedImages" element={<SegmentedImages />} />
      <Route path="/location" element={<Location />} />
      <Route path="/stroage" element={<Stroage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    <Footer />
  </Router>
);
