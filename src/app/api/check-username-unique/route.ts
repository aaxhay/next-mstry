import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/model/user.model";
import { signUpSchema } from "@/schemas/signUpSchema";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
      email: searchParams.get("email"),
      password: searchParams.get("password"),
    };

    const response = signUpSchema.safeParse(queryParams);

    if (!response.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            response.error.flatten.length > 0 ? response.error.format() : [],
        },
        { status: 400 },
      );
    }

    const { username } = response.data;

    const existingUser = await User.findOne({ username, isVerified: true });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "username is available",
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error checking username unique", error);
  }
};
