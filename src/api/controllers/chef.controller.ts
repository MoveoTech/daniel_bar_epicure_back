import { Request, Response } from "express";
import { Chef } from "../../db/chef.model";
import { chefHandler } from "../handlers/chef.handler";

export const getChefOfTheWeek = async (req: Request, res: Response) => {
  const chefOfTheWeek: Chef = await chefHandler.getChefOfTheWeek();
  res.send(chefOfTheWeek);
};

export const getChefs = async (req: Request, res: Response) => {
  const chefs = await chefHandler.getChefs();
  res.send(chefs);
};

export const addChef = async (req: Request, res: Response) => {
  const chef: Chef = req.body;
  await chefHandler.add(chef);
  res.send(chef);
};

export const updateChef = async (req: Request, res: Response) => {
  const { id } = req.params;
  const chef: Chef = req.body;
  const updatedChef = await chefHandler.update(id, chef);
  res.send(updatedChef);
};

export const deleteChef = async (req: Request, res: Response) => {
  const { id } = req.params;
  await chefHandler.remove(id);
  res.end();
};
