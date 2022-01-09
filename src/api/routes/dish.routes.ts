import { Router } from "express";
import { addDish, deleteDish, getDishes, updateDish } from "../controllers/dish.controller";
const router = Router();

router.get("/", getDishes);
router.post("/", addDish);
router.put("/:id",updateDish)
router.delete("/:id", deleteDish);

export default router;
