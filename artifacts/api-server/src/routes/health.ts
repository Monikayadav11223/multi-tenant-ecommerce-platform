import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get(["/health", "/healthz"], (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "API is running" });
  res.json(data);
});

export default router;
