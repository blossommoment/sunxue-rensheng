import express from "express";
import cors from "cors";
import { connectMongo, createRedis } from "./db.js";
import { config } from "./config.js";
import auth from "./routes/auth.js";
import theory from "./routes/theory.js";
import simulator from "./routes/simulator.js";
import report from "./routes/report.js";
import leaderboard from "./routes/leaderboard.js";
import quotes from "./routes/quotes.js";
import contrib from "./routes/contrib.js";
import daily from "./routes/daily.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", auth);
app.use("/api/theory", theory);
app.use("/api/simulator", simulator);
app.use("/api/report", report);
app.use("/api/leaderboard", leaderboard);
app.use("/api/quotes", quotes);
app.use("/api/contrib", contrib);
app.use("/api/daily", daily);

await connectMongo();
const redis = createRedis();
if (redis) app.locals.redis = redis;

app.listen(config.port, () => {
  console.log(`server listening on ${config.port}`);
});
