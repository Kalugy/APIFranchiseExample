import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { PORT } from "./config.js";
// Routes
import indexRoutes from "./routes/index.routes.js";
import productRoutes from "./routes/products.routes.js";
import franchiseRoutes from "./routes/franchises.routes.js";
import branchesRoutes from "./routes/branches.routes.js";


const app = express();

// Settings
app.set("port", PORT || 4000);
app.set("json spaces", 4);

// Middlewares
app.use(
  cors({
    // origin: "http://localhost:3000",
  })
);
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", indexRoutes);
app.use("/api/", productRoutes);
app.use("/api/", franchiseRoutes);
app.use("/api/", branchesRoutes);


export default app;