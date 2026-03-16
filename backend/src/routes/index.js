import { Router } from "express";
import roomsRouter from "./rooms.js";
import paymentsRouter from "./payments.js";
import dashboardRouter from "./dashboard.js";

const router = Router();

router.use("/rooms", roomsRouter);
router.use("/payments", paymentsRouter);
router.use("/dashboard", dashboardRouter);

export default router;
