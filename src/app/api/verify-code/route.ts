import { dbConnect } from "@/lib/dbConnect";
import { userModel } from "@/model/user.model";
import { verifyTokenSchema } from "@/schemas/verifyTokenSchema";
import { NextResponse } from "next/server";

// export const POST = async (request: Request) =>  {
//   await dbConnect();

//   // console.log(request.json());

//   try {
//     const { username, verifyCode } = await request.json();

//     if ([username, verifyCode].some((field) => field.trim() === "")) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "All fields are required",
//         },
//         { status: 400 },
//       );
//     }

//     const response = verifyTokenSchema.safeParse({verifyCode});
//     console.log(response);

//     if (!response.success) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: response.error.format()
//         },
//         { status: 400 },
//       );
//     }

//     const data = response.data;
//     console.log(data);

//     const existingUser = await User.findOne({ username ,isVerified : false });
//     // if (existingUser) {
//     //   return NextResponse.json(
//     //     {
//     //       success: false,
//     //       message: "User is already Verified",
//     //     },
//     //     { status: 400 },
//     //   );
//     // }

//     const code = existingUser.verifyCode === verifyCode;
//     const codeExpiry = new Date(existingUser.verifyTokenExpiry) > new Date();

//     if (code && codeExpiry) {
//       existingUser.isVerified = true;
//       await existingUser.save();

//       return NextResponse.json(
//         {
//           success: true,
//           message: "User is Verified",
//         },
//         { status: 200 },
//       );
//     } else if (!code) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid Code",
//         },
//         { status: 400 },
//       );
//     } else {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Verify Code is Expired",
//         },
//         { status: 400 },
//       );
//     }
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//         {
//           success: false,
//           message: "some error",
//         },
//         { status: 500 },
//       );
//   }
// };

export const POST = async (request: Request) => {
  await dbConnect();

  try {
    const { username, verifyCode } = await request.json();

    if (!username?.trim() || !verifyCode?.trim()) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const response = verifyTokenSchema.safeParse({ verifyCode });

    if (!response.success) {
      return NextResponse.json(
        {
          success: false,
          message: response.error.format().verifyCode?._errors?.join(", "),
        },
        { status: 400 }
      );
    }

    const existingUser = await userModel.findOne({
      username,
      isVerified: false,
    });    

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "User not found or already verified" },
        { status: 404 }
      );
    }

    const isCodeValid = existingUser.verifyToken === verifyCode;
    const isNotExpired =
      new Date(existingUser.verifyTokenExpiry) > new Date();
      

    if (!isCodeValid) {
      return NextResponse.json(
        { success: false, message: "Invalid code entered" },
        { status: 400 }
      );
    }

    if (!isNotExpired) {
      return NextResponse.json(
        { success: false, message: "Verify Code is Expired" },
        { status: 400 }
      );
    }

    existingUser.isVerified = true;
    await existingUser.save();

    return NextResponse.json(
      { success: true, message: "User is Verified" },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Some error occurred" },
      { status: 500 }
    );
  }
};