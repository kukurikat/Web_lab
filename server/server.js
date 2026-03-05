const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const path = require("path");

const app = express();

// ФІНАЛЬНИЙ CSP: Додано домени для аутентифікації, статики та скриптів Google
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "connect-src 'self' https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.googleapis.com https://*.firebaseio.com; " +
      "img-src 'self' data:; " +
      "style-src 'self' 'unsafe-inline'; " +
      "script-src 'self' 'unsafe-inline' https://apis.google.com https://www.gstatic.com https://www.google.com; " +
      "frame-src 'self' https://*.firebaseapp.com https://www.google.com;",
  );
  next();
});

app.use(cors());
app.use(express.json());

let serviceAccount;
if (process.env.FIREBASE_CONFIG) {
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
} else {
  try {
    serviceAccount = require("./serviceAccountKey.json");
  } catch (e) {
    serviceAccount = null;
  }
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

app.use(express.static(path.join(__dirname, "../build")));

app.get("/api/status", (req, res) => {
  res.json({ status: "Server is online" });
});

app.get("/api/progress/:userId", async (req, res) => {
  try {
    const userRef = db.collection("progress").doc(req.params.userId);
    const doc = await userRef.get();
    if (!doc.exists) return res.json({ lessons: [] });
    res.json(doc.data());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/api/progress", async (req, res) => {
  try {
    const { userId, lessons } = req.body;
    await db.collection("progress").doc(userId).set({ lessons });
    res.json({ success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
