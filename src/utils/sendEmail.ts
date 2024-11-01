"use server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  logger: true,
  debug: true,
  auth: {
    user: "inclusum2023@gmail.com",
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendEmail = async (
  email: FormDataEntryValue | null,
  token: String
) => {
  const verificationURL = `http://localhost:3000/api/activate/${token}`;
  try {
    transporter.sendMail({
      from: "PCT-Team",
      to: email,
      subject: "Personal Crypto Ticker - Please verify your email",
      html: `Please click on the following link to verify your email: <a href="${verificationURL}">${verificationURL}</a>`,
    });
    console.log("Email sent successfully");
  } catch (error: any) {
    console.log("Email not sent", error);
  }
};
