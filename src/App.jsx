import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Lessons from "./Lessons";
import Gallery from "./Gallery";
import Progress from "./Progress";
import Auth from "./Auth";
import { authListener, logoutUser } from "./firebase";
import "./style.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = authListener(setUser);
    return () => unsub();
  }, []);

  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Lessons</Link>
            </li>

            {user && (
              <>
                <li>
                  <Link to="/gallery">Gallery</Link>
                </li>
                <li>
                  <Link to="/progress">My Progress</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {user && (
          <div className="user-panel">
            <span>{user.email}</span>
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
      </header>

      <main>
        {!user ? (
          <Auth />
        ) : (
          <Routes>
            <Route path="/" element={<Lessons user={user} />} />
            <Route path="/gallery" element={<Gallery user={user} />} />
            <Route path="/progress" element={<Progress user={user} />} />
          </Routes>
        )}
      </main>
    </Router>
  );
}
