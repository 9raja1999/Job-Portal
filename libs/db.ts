import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

const connectDB =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (mongoose.connections[0].readyState) {
        return handler(req, res);
      }

      await mongoose.connect(`${process.env.MONGO_URL}`);
      return handler(req, res);
    } catch (error) {
      console.log("Error Mongo", error);
      return handler(req, res);
    }
  };

export default connectDB;
