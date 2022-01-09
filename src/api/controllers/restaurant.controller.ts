import { Request, Response } from "express";
import { Restaurant } from "../../db/restaurant.model";
import { restaurantHandler } from "../handlers/restaurant.handler";

export const getPopular = async (req: Request, res: Response) => {
  const popular = await restaurantHandler.getPopular();
  res.send(popular);
};

export const getRestaurant = async (req: Request, res: Response) => {
  const restaurantId: string = req.params.id;
  const restaurant = await restaurantHandler.getById(restaurantId);
  res.send(restaurant);
};

export const getRestaurants = async (req: Request, res: Response) => {
  const restaurants = await restaurantHandler.getRestaurants();
  res.send(restaurants);
};

export const addRestaurant = async (req: Request, res: Response) => {
  const restaurant: Restaurant = req.body;
  await restaurantHandler.add(restaurant);
  res.send(restaurant);
};

export const updateRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const restaurant: Restaurant = req.body;
  const updatedRestaurant = await restaurantHandler.update(id, restaurant);
  res.send(updatedRestaurant);
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  await restaurantHandler.remove(id);
  res.end();
};
