import { Router } from "express";
import { createUser, getUser, getUsersData, getUserReferral, validateUserName, userBonusReferral } from "../controllers/user.controller.js";
import { getUserProduct } from "../controllers/userproduct.controller.js";
import { postNewUserReferral, userAbleReferral} from "../controllers/userreferral.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();

router.post("/", [verifyToken, isAdmin, checkExistingUser], createUser);

router.get("/user", getUser);
router.get("/", getUsersData);
router.get("/validate", validateUserName);
router.get("/userproduct", getUserProduct);
router.get("/user/referral", getUserReferral);
router.post("/claim/referral", postNewUserReferral);
router.post("/ableclaim/referral", userAbleReferral);
router.post("/referral/bonus", userBonusReferral);
export default router
