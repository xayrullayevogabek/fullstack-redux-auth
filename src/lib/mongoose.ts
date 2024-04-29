import mongoose, { ConnectOptions } from "mongoose";

let isConected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.error("MongoDB url is not defined");
  }

  if (isConected) {
    return;
  }

  try {
    const options: ConnectOptions = {
      dbName: "redux-auth",
      autoCreate: true,
    };

    await mongoose.connect(process.env.MONGODB_URL, options);
    isConected = true;
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error connecting to database ");
  }
};
