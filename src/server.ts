import "dotenv/config";
import http from "http";
import cors from "cors";
import routes from "./router";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";

const app = express();
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({credentials: true}));

const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB as string);

const db = mongoose.connection;

db.on("error", (error: Error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use("/", routes);
const server = http.createServer(app);

server.listen(port, () =>
{
  console.log(`Server running at http://localhost:${port}`);
});
