import React, { useState, useEffect } from "react";

export default function Progress() {
  const [completedCount, setCompletedCount] = useState(0);
  const [photosCount, setPhotosCount] = useState(0);
  const totalLessons = 6;

  useEffect(() => {
    const completed =
      JSON.parse(localStorage.getItem("completedLessons")) || [];
    const photos = JSON.parse(localStorage.getItem("photosData")) || [];
    setCompletedCount(completed.length);
    setPhotosCount(photos.length);
  }, []);

  const percent = Math.round((completedCount / totalLessons) * 100);
  const hours = (completedCount * 1.5).toFixed(1);

  return (
    <section id="progress-section">
      <h2>My Learning Statistics</h2>
      <div className="stats-container">
        <div className="stat-box">
          <h3>Overall Course Completion</h3>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${percent}%` }}>
              {percent}%
            </div>
          </div>
        </div>
        <div className="stat-grid">
          <div className="stat-item">
            <h4>Lessons Completed</h4>
            <p className="stat-number">
              {completedCount} / {totalLessons}
            </p>
          </div>
          <div className="stat-item">
            <h4>Hours Watched</h4>
            <p className="stat-number">{hours} h</p>
          </div>
          <div className="stat-item">
            <h4>Photos Uploaded</h4>
            <p className="stat-number">{photosCount}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
