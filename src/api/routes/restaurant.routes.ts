import { Router } from "express";
import {
  getPopular,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurants,
} from "../controllers/restaurant.controller";

const router = Router();

router.get("/", getRestaurants);
router.get("/popular/", getPopular);
router.post("/", addRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id",deleteRestaurant)

export default router;
