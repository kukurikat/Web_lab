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

let photosData = JSON.parse(localStorage.getItem("photosData")) || [];
let completedLessons =
  JSON.parse(localStorage.getItem("completedLessons")) || [];
let activeFilters = [];

const lessonsContainer = document.getElementById("lessonsContainer");
if (lessonsContainer) {
  let i = 0;
  while (i < lessonsData.length) {
    const lesson = lessonsData[i];
    const isChecked = completedLessons.includes(lesson.id) ? "checked" : "";
    lessonsContainer.innerHTML += `
            <article class="card">
                <div class="video-wrapper">
                    <img src="${lesson.img}" alt="${lesson.title}">
                </div>
                <div class="lesson-header-flex">
                    <h3>${lesson.title}</h3>
                    <label class="custom-checkbox">
                        <input type="checkbox" data-id="${lesson.id}" class="lesson-cb" ${isChecked}>
                        <span class="checkmark"></span>
                    </label>
                </div>
                <p>${lesson.desc}</p>
                <a href="#" class="btn">Read Text Material</a>
            </article>`;
    i++;
  }

  document.querySelectorAll(".lesson-cb").forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const id = parseInt(e.target.dataset.id);
      if (e.target.checked) {
        completedLessons.push(id);
      } else {
        completedLessons = completedLessons.filter((lId) => lId !== id);
      }
      localStorage.setItem(
        "completedLessons",
        JSON.stringify(completedLessons),
      );
    });
  });
}

const galleryContainer = document.getElementById("galleryContainer");
if (galleryContainer) {
  function renderGallery() {
    galleryContainer.innerHTML = "";
    let j = 0;
    while (j < photosData.length) {
      const photo = photosData[j];
      if (activeFilters.length === 0 || activeFilters.includes(photo.type)) {
        galleryContainer.innerHTML += `
                    <article class="card gallery-card">
                        <img src="${photo.src}" alt="${photo.type}">
                        <div class="photo-info">
                            <p>Type: ${photo.type}</p>
                            <p>Uploaded: ${photo.time}</p>
                            <button class="btn delete-btn" data-index="${j}">Delete</button>
                        </div>
                    </article>`;
      }
      j++;
    }

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        photosData.splice(index, 1);
        localStorage.setItem("photosData", JSON.stringify(photosData));
        renderGallery();
      });
    });
  }

  renderGallery();

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const type = e.target.dataset.filter;
      if (type === "all") {
        activeFilters = [];
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
      } else {
        document
          .querySelector('[data-filter="all"]')
          .classList.remove("active");
        if (activeFilters.includes(type)) {
          activeFilters = activeFilters.filter((f) => f !== type);
          e.target.classList.remove("active");
        } else {
          activeFilters.push(type);
          e.target.classList.add("active");
        }
        if (activeFilters.length === 0) {
          document.querySelector('[data-filter="all"]').classList.add("active");
        }
      }
      renderGallery();
    });
  });

  const modal = document.getElementById("uploadModal");
  const openBtn = document.getElementById("openUploadModal");
  const closeBtn = document.querySelector(".close");
  const uploadForm = document.getElementById("uploadForm");
  const fileInput = document.getElementById("newPhotoFile");
  const typeInput = document.getElementById("newPhotoType");

  openBtn.onclick = () => (modal.style.display = "block");
  closeBtn.onclick = () => (modal.style.display = "none");
  window.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
  };

  uploadForm.onsubmit = (e) => {
    e.preventDefault();
    const file = fileInput.files[0];
    const type = typeInput.value;
    const time = new Date().toLocaleString();

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        photosData.push({ src: event.target.result, type: type, time: time });
        localStorage.setItem("photosData", JSON.stringify(photosData));
        renderGallery();
        modal.style.display = "none";
        uploadForm.reset();
      };
      reader.readAsDataURL(file);
    }
  };
}

const progressSection = document.getElementById("progress-section");
if (progressSection) {
  const totalLessons = 6;
  const compLessons = completedLessons.length;
  const percent = Math.round((compLessons / totalLessons) * 100);

  document.getElementById("stat-completed").textContent =
    `${compLessons} / ${totalLessons}`;
  document.getElementById("stat-percent").textContent = `${percent}%`;
  document.getElementById("stat-percent").style.width = `${percent}%`;
  document.getElementById("stat-photos").textContent = photosData.length;
  document.getElementById("stat-hours").textContent =
    (compLessons * 1.5).toFixed(1) + " h";
}
