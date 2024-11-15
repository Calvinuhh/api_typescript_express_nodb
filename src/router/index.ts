import { Router } from "express";
import dataRouter from "./routes/data.routes";

const router: Router = Router();

router.use("/data", dataRouter);

export default router;
