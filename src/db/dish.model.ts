import { Schema, model, ObjectId } from "mongoose";

export interface Dish {
  name: string;
  description: string;
  menuKey?: string;
  price: number;
  restaurant: ObjectId | string;
  img: { src: string; alt: string };
}

const dishSchema = new Schema<Dish>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  menuKey: { type: String },
  price: { type: Number, required: true },
  img: { type: Schema.Types.Mixed },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

export const DishModel = model<Dish>("Dish", dishSchema);
