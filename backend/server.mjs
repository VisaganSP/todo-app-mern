import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import todoRoutes from "./routes/todoRoutes.mjs";

dotenv.config();
connectDB();

const app = express();

const allowedDomains = [
  "http://localhost:5173",
  "https://visaiinnovations.com",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
