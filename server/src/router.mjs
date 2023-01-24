import { Router } from "express";
import { testConnection } from "./handlers/database.mjs";

const router = Router();

router.post("/test", testConnection); 

export default router;
