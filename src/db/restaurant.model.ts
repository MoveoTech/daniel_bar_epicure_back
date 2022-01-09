import { Schema, model, ObjectId, Types, Document } from "mongoose";

export interface Restaurant extends Document {
  // _id: ObjectId | string;
  name: string;
  isPopular: boolean;
  img: { src: string; alt?: string };
  signatureDish?: ObjectId;
  // dishes?: Types.Array<ObjectId>;
  chef?: ObjectId;
}

export const restaurantSchema = new Schema<Restaurant>({
  name: { type: String, required: true },
  isPopular: { type: Boolean },
  img: { type: Schema.Types.Mixed },
  signatureDish: { type: Schema.Types.ObjectId, ref: "Dish" },
  // dishes: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
  chef: { type: Schema.Types.ObjectId, ref: "Chef" },
});

export const RestaurantModel = model<Restaurant>(
  "Restaurant",
  restaurantSchema,
  "restaurants"
);