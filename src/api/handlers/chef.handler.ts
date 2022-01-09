import { Chef, ChefModel } from "../../db/chef.model";
import { ChefOfTheWeekModel } from "../../db/chef_of_the_week.model";

export const getChefOfTheWeek = async () => {
  try {
    const res = await ChefOfTheWeekModel.aggregate([
      {
        $lookup: {
          from: "chefs",
          let: { chefId: "$chef" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$$chefId", "$_id"] },
              },
            },
            {
              $lookup: {
                from: "restaurants",
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$$chefId", "$chef"] },
                    },
                  },
                ],
                as: "restaurants",
              },
            },
          ],
          as: "chef",
        },
      },
      { $unwind: "$chef" },
    ]);
    return res[0].chef;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// export const getChefOfTheWeek = async () => {
//   try {
//     const res = await ChefOfTheWeekModel.aggregate([
//       {
//         $lookup: {
//           from: "chefs",
//           pipeline: [
//             {
//               $lookup: {
//                 from: "restaurants",
//                 localField: "restaurants",
//                 foreignField: "_id",
//                 as: "restaurants",
//               },
//             },
//           ],
//           localField: "chef",
//           foreignField: "_id",
//           as: "chef",
//         },
//       },
//       { $unwind: "$chef" },
//     ]);

//     return res[0].chef;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

const getChefs = async () => {
  try {
    const chefs = await ChefModel.find()
    return chefs;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const add = async (chef: Chef) => {
  const _chef = new ChefModel(chef);
  try {
    await _chef.save();
    return _chef;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const update = async (id: string, chef: Chef) => {
  try {
    const _chef = await ChefModel.findByIdAndUpdate(id, chef, { new: true });
    if (_chef) {
      return _chef;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const remove = async (id: string) => {
  console.log(typeof id);
  try {
    await ChefModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const chefHandler = {
  getChefOfTheWeek,
  add,
  update,
  getChefs,
  remove,
};
