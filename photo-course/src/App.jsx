import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Lessons from "./Lessons";
import Gallery from "./Gallery";
import Progress from "./Progress";
import "./style.css";

export default function App() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Lessons</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/progress">My Progress</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Lessons />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </main>
      <footer>
        <p>Contact us: support@photocourse.com | +1 234 567 8900</p>
      </footer>
    </Router>
  );
}
