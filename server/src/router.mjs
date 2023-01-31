import { Router } from "express";
import { testConnection, setupDatabase } from "./handlers/database.mjs";

const router = Router();

router.post("/test", testConnection);
router.post("/setup", setupDatabase)

export default router;
