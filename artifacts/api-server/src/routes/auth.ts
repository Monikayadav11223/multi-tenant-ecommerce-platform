import { Router, type IRouter } from "express";
import {
  getCurrentUser,
  login,
  register,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authenticate";

const router: IRouter = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getCurrentUser);

export default router;