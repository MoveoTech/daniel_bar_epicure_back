import { Types } from "mongoose";
import { Dish, DishModel } from "../../db/dish.model";
import { RestaurantModel } from "../../db/restaurant.model";

const getDishes = async () => {
  const dishes = await DishModel.find().populate({
    path: "restaurant",
  });
  return dishes;
};

const add = async (dish: Dish) => {
  const _dish = new DishModel(dish);
  const { _id: dishId } = _dish;
  const { restaurant: restaurantId } = _dish;

  try {
    await RestaurantModel.updateOne(
      { _id: restaurantId },
      { $push: { dishes: dishId } }
    );
    await _dish.save();
    return _dish;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const update = async (id: string, dish: Dish) => {
  try {
    const _dish = await DishModel.findByIdAndUpdate(id, dish, { new: true });
    if (_dish) {
      console.log(_dish);
      return _dish;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const remove = async (id: string) => {
  const _dishId = new Types.ObjectId(id);
  console.log(_dishId);

  try {
    await DishModel.findByIdAndDelete(_dishId);
    await RestaurantModel.updateOne(
      { $or: [{ dishes: _dishId }, { signatureDish: _dishId }] },
      {
        $pull: { dishes: _dishId },
        $unset: {
          signatureDish: {
            $cond: { $eq: ["$signatureDish", _dishId], then: 1, else: 0 },
          },
        },
      }
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const dishHandler = {
  getDishes,
  add,
  update,
  remove,
};
