import { resend } from "@/lib/resend";
import { EmailTemplate } from "../../emails/EmailTemplate";

export const sendVerificationEmail = async (
  username: string,
  email: string,
  verifyToken: string,
) : Promise<Response> => {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification Email | AnonymousText",
      react: EmailTemplate({ username, otp: verifyToken }),
    });
    return Response.json({
      success: true,
      message: "Verification email sent successfully",
    },{status:200})
  } catch (error) {
    console.log("Error sending verification email: ", error);
    return Response.json({
      success: true,
      message: "Verification email sent successfully",
    },{status:200})
  }
};
