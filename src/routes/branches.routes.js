import { Router } from "express";
import {
  createBranches,
  deleteBranchById,
  updateBranchById,
  getBranch,
  getBranchById
} from "../controllers/branches.controller.js";

const router = Router();

router.get("/branch", getBranch);

router.get("/branch/:branchId", getBranchById);

router.post("/franchise/:franchiseId/branch", createBranches);

router.put("/branch/:branchId", updateBranchById);

router.delete("/branch/:branchId", deleteBranchById);

export default router;
