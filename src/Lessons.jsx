import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const lessonsData = [
  {
    id: 1,
    title: "Photography Basics",
    img: "https://picsum.photos/500/300?random=1",
    desc: "Camera settings, exposure, and composition.",
  },
  {
    id: 2,
    title: "Shooting Techniques",
    img: "https://picsum.photos/500/300?random=2",
    desc: "Lighting, angles, and manual focus.",
  },
  {
    id: 3,
    title: "Photo Editing",
    img: "https://picsum.photos/500/300?random=3",
    desc: "Post-processing tricks.",
  },
  {
    id: 4,
    title: "Portrait Photography",
    img: "https://picsum.photos/500/300?random=4",
    desc: "Capturing emotion and lighting faces.",
  },
  {
    id: 5,
    title: "Landscape Mastery",
    img: "https://picsum.photos/500/300?random=5",
    desc: "Golden hour and wide-angle shots.",
  },
  {
    id: 6,
    title: "Macro World",
    img: "https://picsum.photos/500/300?random=6",
    desc: "Extreme close-ups and details.",
  },
];

export default function Lessons({ user }) {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    if (!user) return;
    const loadProgress = async () => {
      const ref = doc(db, "progress", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setCompleted(snap.data().lessons || []);
      }
    };
    loadProgress();
  }, [user]);

  const toggleLesson = async (id) => {
    const updated = completed.includes(id)
      ? completed.filter((l) => l !== id)
      : [...completed, id];

    setCompleted(updated);

    // Зберігаємо в Firebase
    await setDoc(doc(db, "progress", user.uid), {
      lessons: updated,
    });
  };

  return (
    <section id="lessons">
      <h2>Lessons</h2>
      <p className="progress-info">
        Completed:{" "}
        <strong>
          {completed.length} / {lessonsData.length}
        </strong>
      </p>

      <div className="grid-container">
        {lessonsData.map((lesson) => (
          <article className="card" key={lesson.id}>
            <div className="video-wrapper">
              <img src={lesson.img} alt={lesson.title} />
            </div>

            <div className="lesson-header-flex">
              <h3>{lesson.title}</h3>
              {/* Використовуємо твої кастомні класи з CSS */}
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={completed.includes(lesson.id)}
                  onChange={() => toggleLesson(lesson.id)}
                />
                <span className="checkmark"></span>
              </label>
            </div>

            <p>{lesson.desc}</p>
            <button className="btn">Read Text Material</button>
          </article>
        ))}
      </div>
    </section>
  );
}
