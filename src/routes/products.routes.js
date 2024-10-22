import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  getProductById,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/product", getProducts);

router.get("/product/:id", getProductById);

router.post("/branch/:branchId/product", createProduct);

router.put("/product/:productId", updateProductById);

router.delete("/branch/:branchId/product/:productId", deleteProductById);

export default router;
