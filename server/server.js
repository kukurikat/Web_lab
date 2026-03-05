const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const path = require("path");

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

app.use(express.static(path.join(__dirname, "../build")));

app.get("/api/status", (req, res) => {
  res.json({ status: "Server is online" });
});

app.get("(.*)", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
