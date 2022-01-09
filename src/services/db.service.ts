import { connect } from "mongoose";

export const connectToDB = async () => {
  try {
    await connect("mongodb+srv://daniel_moveo:danielbar123@cluster0.1e6d6.mongodb.net/epicure?retryWrites=true&w=majority");
    console.log('db connected')
  } catch (err) {
    console.log("error connecting to db", err);
  }
};



