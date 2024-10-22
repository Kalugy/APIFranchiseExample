import { Router } from "express";
import {
  createFranchise,
  getTopProducts,
  deleteFranchiseById,
  updateFranchiseById,
  getFranchise,
  getFranchiseById
} from "../controllers/franchises.controller.js";

const router = Router();

router.get("/franchise", getFranchise);

router.get("/franchise/:franchiseId", getFranchiseById);

router.post("/franchise", createFranchise);

router.get("/franchise/:franchiseId/top-products", getTopProducts);

router.put("/franchise/:franchiseId", updateFranchiseById);

router.delete("/franchise/:franchiseId", deleteFranchiseById);

export default router;
