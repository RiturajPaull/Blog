import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./connection/connectDB.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, resp) => {
  resp.send("Hello server is on !!");
});
app.use("/api/admin", adminRouter);
app.use("/api/image", blogRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
  });
});

export default app;
