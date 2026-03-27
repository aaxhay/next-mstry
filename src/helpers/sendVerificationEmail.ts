import { resend } from "@/lib/resend";
import { EmailTemplate } from "../../emails/EmailTemplate";
import { ApiResponse } from "@/types/ApiResponse";

export const sendVerificationEmail = async (
  username: string,
  email: string,
  verifyToken: string,
): Promise<ApiResponse> => {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification Email | AnonymousText",
      react: EmailTemplate({ username, otp: verifyToken }),
    });
    return {
      success: true,
      message: "Verification email sent successfully",
      status : 200
    };
  } catch (error) {
    console.log("Error sending verification email: ", error);
    return {
      success: false,
      message: "Error while sending Verification email",
      status : 500
    };
  }
};
