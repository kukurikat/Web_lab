import React, { useState, useEffect } from "react";

export default function Gallery({ user }) {
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setModalOpen] = useState(false);
  const [newType, setNewType] = useState("portrait");
  const [newFile, setNewFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPhotos = localStorage.getItem("my_gallery_photos");
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    }
  }, []);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newFile) return alert("Будь ласка, виберіть файл!");
    setLoading(true);

    try {
      const base64Image = await fileToBase64(newFile);
      const newPhoto = {
        id: Date.now(),
        userId: user?.uid || "guest",
        imageUrl: base64Image,
        type: newType,
        time: new Date().toLocaleString(),
      };

      const updatedPhotos = [...photos, newPhoto];
      setPhotos(updatedPhotos);
      localStorage.setItem("my_gallery_photos", JSON.stringify(updatedPhotos));

      setModalOpen(false);
      setNewFile(null);
      alert("Фото збережено!");
    } catch (error) {
      console.error(error);
      alert("Помилка при збереженні");
    } finally {
      setLoading(false);
    }
  };

  const deletePhoto = (id) => {
    const filtered = photos.filter((p) => p.id !== id);
    setPhotos(filtered);
    localStorage.setItem("my_gallery_photos", JSON.stringify(filtered));
  };

  const filteredPhotos =
    filter === "all" ? photos : photos.filter((p) => p.type === filter);

  return (
    <section id="gallery">
      <h2>Local Gallery</h2>

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
            {f}
          </button>
        ))}
      </div>

      <div className="grid-container">
        {filteredPhotos.map((photo) => (
          <article className="card gallery-card" key={photo.id}>
            <img src={photo.imageUrl} alt={photo.type} />
            <div className="photo-info">
              <p>Type: {photo.type}</p>
              <small>{photo.time}</small>
              <br />
              <button
                className="delete-btn"
                onClick={() => deletePhoto(photo.id)}
              >
                Видалити
              </button>
            </div>
          </article>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>
              ×
            </span>
            <h2>Upload Photo</h2>
            <form onSubmit={handleUpload}>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
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
              />
              <br />
              <br />
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Saving..." : "Save Locally"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
