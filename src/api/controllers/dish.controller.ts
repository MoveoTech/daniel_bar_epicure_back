import { Request, Response } from "express";
import { Types } from "mongoose";
import { Dish } from "../../db/dish.model";
import { dishHandler } from "../handlers/dish.handler";

export const getDishes = async (req: Request, res: Response) => {
  const system = await dishHandler.getDishes();
  res.send(system);
};

export const addDish = async (req: Request, res: Response) => {
  const dish = req.body;
  let { restaurant: restaurantId } = dish;

  if (typeof restaurantId === "string") {
    restaurantId = new Types.ObjectId(restaurantId);
    dish.restaurant = restaurantId;
  }

  await dishHandler.add(dish);
  res.send(dish);
};

export const updateDish = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dish: Dish = req.body;
  
  const updatedDish = await dishHandler.update(id, dish);
  res.send(updatedDish);
};

export const deleteDish = async (req: Request, res: Response) => {
  const { id } = req.params;
  await dishHandler.remove(id);
  res.end();
};
