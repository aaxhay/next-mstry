import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
  databaseHost?: string;
};

const connection: ConnectionObject = {};

const dbConnect = async () : Promise<void> => {
  if (connection.isConnected) {
    console.log("Database is aleady connected!");
    return;
  }

  try {
    // console.log(process.env.MONGODB_URI)
    const db = await mongoose.connect(`${process.env.MONGODB_URI}/app`|| "");

    connection.isConnected = db.connections[0].readyState;
    connection.databaseHost = db.connections[0].host;

    console.log("Database is connected successfully");
  } catch (error) {
    console.log("Error while connecting to Database", error);

    process.exit(1);
  }
};

export { dbConnect };
