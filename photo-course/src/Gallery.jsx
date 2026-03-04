import React, { useState, useEffect } from "react";

export default function Gallery() {
  const [photos, setPhotos] = useState(
    () => JSON.parse(localStorage.getItem("photosData")) || [],
  );
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setModalOpen] = useState(false);
  const [newType, setNewType] = useState("portrait");
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    localStorage.setItem("photosData", JSON.stringify(photos));
  }, [photos]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (newFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhoto = {
          src: event.target.result,
          type: newType,
          time: new Date().toLocaleString(),
        };
        setPhotos((prev) => [...prev, newPhoto]);
        setModalOpen(false);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const deletePhoto = (indexToDelete) => {
    setPhotos((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const filteredPhotos =
    filter === "all" ? photos : photos.filter((p) => p.type === filter);

  return (
    <section id="gallery">
      <h2>Gallery</h2>
      <div className="controls">
        <button onClick={() => setModalOpen(true)} className="btn">
          Upload Photo
        </button>
      </div>
      <div className="filters">
        {["all", "portrait", "landscape", "macro"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid-container">
        {filteredPhotos.map((photo, i) => (
          <article className="card gallery-card" key={i}>
            <img src={photo.src} alt={photo.type} />
            <div className="photo-info">
              <p>Type: {photo.type}</p>
              <p>Uploaded: {photo.time}</p>
              <button className="btn delete-btn" onClick={() => deletePhoto(i)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <h2>Upload New Photo</h2>
            <form onSubmit={handleUpload}>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                required
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
                <option value="macro">Macro</option>
              </select>
              <br />
              <br />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewFile(e.target.files[0])}
                required
              />
              <br />
              <br />
              <button type="submit" className="btn">
                Save to Photos
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
