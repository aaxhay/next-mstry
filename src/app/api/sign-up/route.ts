import { ApiResponse } from "@/types/ApiResponse";
import { dbConnect } from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs";
import { User } from "@/model/user.model";

export const POST = async (request: Request): Promise<ApiResponse> => {
  await dbConnect();
  try {
    return {
      success: true,
      message: "User Created Successfully || Signed Up Successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to Create a user",
    };
  }
};
