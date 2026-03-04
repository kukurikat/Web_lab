import React, { useEffect, useState } from "react";

const lessonsData = [
  "Photography Basics",
  "Shooting Techniques",
  "Photo Editing",
  "Portrait Photography",
  "Landscape Mastery",
  "Macro World",
];

export default function Progress({ user }) {
  const storageKey = `completedLessons_${user.email}`;

  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setCompleted(saved ? JSON.parse(saved) : []);
  }, [storageKey]);

  return (
    <section>
      <h2>My Progress</h2>

      <p>
        User: <strong>{user.email}</strong>
      </p>

      <ul>
        {lessonsData.map((lesson, index) => (
          <li key={index}>
            {completed.includes(index + 1) ? "✅" : "⬜"} {lesson}
          </li>
        ))}
      </ul>

      <p>
        Completed: {completed.length} / {lessonsData.length}
      </p>
    </section>
  );
}
