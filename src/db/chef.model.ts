import { Schema, model, ObjectId, Types } from "mongoose";

export interface Chef {
  firstName: string;
  lastName: string;
  // restaurants: Types.Array<ObjectId>;
  profileImg?: { src: string; alt?: string };
  description?: string;
}

export const chefSchema = new Schema<Chef>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String },
  profileImg: { type: Schema.Types.Mixed },
  // restaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
});

export const ChefModel = model<Chef>("Chef", chefSchema);
