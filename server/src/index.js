import express from "express";
import cors from "cors";
import { connectMongo, createRedis } from "./db.js";
import { config } from "./config.js";
import auth from "./routes/auth.js";
import theory from "./routes/theory.js";
import report from "./routes/report.js";
import daily from "./routes/daily.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", auth);
app.use("/api/theory", theory);
app.use("/api/report", report);
app.use("/api/daily", daily);


await connectMongo();
const redis = createRedis();
if (redis) app.locals.redis = redis;

app.listen(config.port, () => {
  console.log(`server listening on ${config.port}`);
});
