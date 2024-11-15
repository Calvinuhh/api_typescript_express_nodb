import { Router } from "express";
import {
  getAllDataController,
  createDataController,
  getDataByIdController,
  updateByIdController,
  deleteByIdController,
} from "../../controllers/arrayCrudController";

const dataRouter: Router = Router();

dataRouter.post("/", createDataController);
dataRouter.get("/", getAllDataController);
dataRouter.get("/:id", getDataByIdController);
dataRouter.put("/:id", updateByIdController);
dataRouter.delete("/:id", deleteByIdController);

export default dataRouter;
