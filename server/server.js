const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
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

app.get("/api/progress/:userId", async (req, res) => {
  try {
    const userRef = db.collection("progress").doc(req.params.userId);
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.json({ lessons: [] });
    }
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

app.get("/api/status", (req, res) => {
  res.json({ status: "Server is online" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
