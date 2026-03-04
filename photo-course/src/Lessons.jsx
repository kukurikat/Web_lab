import React, { useState, useEffect } from "react";

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

export default function Lessons() {
  const [completed, setCompleted] = useState(
    () => JSON.parse(localStorage.getItem("completedLessons")) || [],
  );

  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(completed));
  }, [completed]);

  const toggleLesson = (id) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((lId) => lId !== id) : [...prev, id],
    );
  };

  return (
    <section id="lessons">
      <h2>Lessons</h2>
      <div className="grid-container">
        {lessonsData.map((lesson) => (
          <article className="card" key={lesson.id}>
            <div className="video-wrapper">
              <img src={lesson.img} alt={lesson.title} />
            </div>
            <div className="lesson-header-flex">
              <h3>{lesson.title}</h3>
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
