const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todoRoutes");
const { baseRoot } = require("./controllers/todoController");

const app = express();

// السماح للفرونت أو Postman بالاتصال
app.use(cors());

// استقبال البيانات بصيغة JSON
app.use(express.json());

// اتصال MongoDB داخل Docker عبر اسم السيرفس
mongoose
  .connect("mongodb://mango:27017/todoDB")
  .then(() => console.log("✅ DB Connected Successfully (Docker Compose)"))
  .catch((error) => console.log("❌ DB Connection Error:", error));

// الراوت الأساسي
app.get("/", baseRoot);

// راوت المهام
app.use("/api", todoRoutes);

// تشغيل السيرفر داخل Docker
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT} (Docker Compose)`);
});
