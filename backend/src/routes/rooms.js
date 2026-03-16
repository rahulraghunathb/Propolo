import { Router } from "express";
import { getRoomTenantsById, getRooms } from "../controllers/roomController.js";

const router = Router();

router.get("/", getRooms);
router.get("/:id/tenants", getRoomTenantsById);

export default router;
