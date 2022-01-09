import { Types } from "mongoose";
import { ChefModel } from "../../db/chef.model";
import { Restaurant, RestaurantModel } from "../../db/restaurant.model";

const getPopular = async () => {
  try {
    const restaurants: Restaurant[] = await query({isPopular:true});
    console.log(restaurants);

    return restaurants;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getRestaurants = async () => {
  try {
    const restaurants: Restaurant[] = await query({});
    console.log(restaurants);
    return restaurants;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const query = async (matchQuery: any = {}) => {
  try {
    const restaurants: Restaurant[] = await RestaurantModel.find(matchQuery)
      .populate("chef")
      .populate("signatureDish");

    return restaurants;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const add = async (restaurant: Restaurant) => {
  const _restaurant: Restaurant = new RestaurantModel(restaurant);
  try {
    await _restaurant.save();
    return _restaurant;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const update = async (id: string, restaurant: Restaurant) => {
  try {
    const _restaurant = await RestaurantModel.findByIdAndUpdate(
      id,
      restaurant,
      { new: true }
    );
    if (_restaurant) {
      return _restaurant;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const remove = async (id: string) => {
  console.log(typeof id);
  
  // const _restaurantId = new Types.ObjectId(id);
  // console.log(typeof _restaurantId);
  
  try {
    await RestaurantModel.findByIdAndDelete(id);
    await ChefModel.updateOne(
      { restaurants: id },
      { $pull: { restaurants: id } }
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getById = async (restaurantId: string) => {};

export const restaurantHandler = {
  getPopular,
  getById,
  getRestaurants,
  add,
  update,
  remove,
};

// const query = async (matchQuery: {} = {}) => {
//   try {
//     const restaurants: Restaurant[] = await RestaurantModel.aggregate([
//       {
//         $match: matchQuery,
//       },
//       {
//         $lookup: {
//           from: "chefs",
//           pipeline: [{ $unset: ["images", "restaurants"] }],
//           localField: "_id",
//           foreignField: "restaurants",
//           as: "chef",
//         },
//       },
//       { $unwind: "$chef" },
//     ]);
//     return restaurants;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };
