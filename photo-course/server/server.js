const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
// Підключаємо твій завантажений ключ
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(express.json());

// Тестовий маршрут для перевірки бази даних
app.get("/api/users", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = [];
    snapshot.forEach((doc) => users.push({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
