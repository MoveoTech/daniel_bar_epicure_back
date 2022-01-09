import { Schema, model, ObjectId, Types } from "mongoose";

export interface ChefOfTheWeek {
  chef: ObjectId;
}

export const chefOfTheWeekSchema = new Schema<ChefOfTheWeek>({
  chef: { type: Schema.Types.ObjectId, ref: "Chef" },
});

export const ChefOfTheWeekModel = model<ChefOfTheWeek>(
  "ChefOfTheWeek",
  chefOfTheWeekSchema,
  "chef_of_the_week"
);
