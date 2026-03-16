import { Router } from "express";
import { getPayments, patchMarkPaid } from "../controllers/paymentController.js";

const router = Router();

router.get("/", getPayments);
router.patch("/:tenantId/mark-paid", patchMarkPaid);

export default router;
