import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Preview,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface EmailTemplateProps {
  username?: string;
  otp?: string;
}

export const EmailTemplate = ({username,otp}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your OTP code is here 🔐</Preview>

      <Tailwind>
        <Body className="bg-gray-100 py-10 px-4 font-sans">
          <Container className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <Section className="bg-linear-to-r from-indigo-500 to-purple-600 text-white text-center py-6">
              <Heading className="text-2xl font-bold m-0">
                Verify Your Account 🔐
              </Heading>
              <Text className="text-sm opacity-90 mt-2">
                Secure login with one-time password
              </Text>
            </Section>

            {/* Body */}
            <Section className="p-6 text-gray-700 text-center">
              <Heading className="text-lg font-semibold mb-2 text-left">
                Hi {username},
              </Heading>

              <Text className="text-sm leading-relaxed mb-6 text-left">
                Use the OTP below to complete your verification. This code is
                valid for a few minutes. Do not share it with anyone.
              </Text>

              {/* OTP Box */}
              <Section className="bg-gray-100 rounded-xl py-4 mb-6">
                <Text className="text-3xl font-bold tracking-widest text-indigo-600 m-0">
                  {otp}
                </Text>
              </Section>

              <Text className="text-xs text-gray-500">
                If you didn’t request this, you can safely ignore this email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-50 text-center py-4">
              <Text className="text-xs text-gray-400">
                © {new Date().getFullYear()} Your Company. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
