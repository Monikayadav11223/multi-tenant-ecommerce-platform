import { Router, type IRouter } from "express";
import {
  getVendorAccess,
  getCurrentUser,
  login,
  register,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authenticate";
import { authorizeRoles } from "../middlewares/authorize-roles";

const router: IRouter = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getCurrentUser);
router.get(
  "/vendor-access",
  authenticate,
  authorizeRoles("super_admin", "vendor"),
  getVendorAccess,
);

export default router;