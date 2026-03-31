import { ApiResponse } from "@/types/ApiResponse";
import { dbConnect } from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs";
import { User } from "@/model/user.model";


export const POST = async (request: Request): Promise<Response> => {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const foundUserByUsernameAndVerified = await User.findOne({
      username,
      isVerified: true,
    });

    const otp = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");

    if (foundUserByUsernameAndVerified) {
      console.log("User already Exist");
      return Response.json({
        message: "User already exists with this username",
        success: false,
      })
    }

    const userWithEmail = await User.findOne({ email });
    
    // if we found user with this email
    if (userWithEmail) {
      // checking if userWithEmail is verified === true
      if (userWithEmail.isVerified) {
        return Response.json({
          message: "User already exist with this email",
          success: false,
        },{status:400})
      } else {

        //userWithEmail is not verified yet
        const hashedPassword = await bcrypt.hash(password, 10);

        userWithEmail.password = hashedPassword;
        userWithEmail.verifyToken = otp;
        userWithEmail.verifyTokenExpiry = new Date(Date.now() + 3600000);

        await userWithEmail.save();
      }
    } else {
      // new user

      const hashedPassword = await bcrypt.hash(password, 10);

      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 1);

      const createdUser = await User.create({
        username,
        email,
        password: hashedPassword,
        isAcceptingMessages: true,
        verifyToken: otp,
        verifyTokenExpiry: expiryTime,
        isVerified: false,
        messages: [],
      });

      await createdUser.save();

      if (createdUser) {
        return Response.json({
          message: "User Created Successfully",
          success: true,
        });
      }
    }

    const emailResponse = await sendVerificationEmail(username, email, otp);

    if (!emailResponse.success) {
      return Response.json({
        message: "failed to send the email",
        success: false,
      });
    }

    return Response.json({
      success: true,
      message: "User Created Successfully || Signed Up Successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Failed to Create a user",
    });
  }
};
