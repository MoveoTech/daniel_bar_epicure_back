import { Router } from "express";
import { authenticateToken } from "../../middleware/authenticateToken";
import {
  addChef,
  getChefOfTheWeek,
  getChefs,
  updateChef,
  deleteChef,
} from "../controllers/chef.controller";

const router = Router();

router.get("/chef-of-the-week", getChefOfTheWeek);
router.get("/", getChefs);
router.post("/", addChef);
router.put("/:id", updateChef);
router.delete("/:id", authenticateToken, deleteChef);

export default router;
