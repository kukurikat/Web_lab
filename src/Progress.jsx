import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const lessonsNames = [
  "Photography Basics",
  "Shooting Techniques",
  "Photo Editing",
  "Portrait Photography",
  "Landscape Mastery",
  "Macro World",
];

export default function Progress({ user }) {
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      try {
        const ref = doc(db, "progress", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setCompleted(snap.data().lessons || []);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  // Розрахунок відсотка для прогрес-бару (з твого CSS)
  const progressPercent = Math.round(
    (completed.length / lessonsNames.length) * 100,
  );

  if (loading)
    return (
      <p style={{ textAlign: "center", padding: "20px" }}>
        Loading progress...
      </p>
    );

  return (
    <section className="stats-container">
      <h2>My Progress</h2>

      <div className="stat-box">
        <p>
          User: <strong>{user.email}</strong>
        </p>

        {/* Прогрес-бар з твого файлу стилів */}
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          >
            {progressPercent}%
          </div>
        </div>
      </div>

      <div className="stat-grid">
        {lessonsNames.map((lesson, index) => {
          const lessonId = index + 1;
          const isDone = completed.includes(lessonId);

          return (
            <div className="stat-item" key={index}>
              <h4>{lesson}</h4>
              <p className="stat-number">
                {isDone ? "✅ Done" : "⬜ In Progress"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="stat-box" style={{ marginTop: "20px" }}>
        <p>
          Total lessons completed: {completed.length} / {lessonsNames.length}
        </p>
      </div>
    </section>
  );
}
