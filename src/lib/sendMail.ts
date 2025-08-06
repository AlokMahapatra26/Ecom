import nodemailer from 'nodemailer';

// Define the type for the function's return value
interface SendMailResult {
  success: boolean;
  message?: string;
}

// The function now explicitly annotates parameter and return types
export const sendMail = async (
  subject: string,
  receiver: string,
  body: string
): Promise<SendMailResult> => {
  // recommend stricter checks for environment variables in production code
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT ? Number(process.env.NODEMAILER_PORT) : 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const options: nodemailer.SendMailOptions = {
    from: `"Alok Mahapatra" <${process.env.NODEMAILER_EMAIL}>`,
    to: receiver,
    subject: subject,
    html: body,
  };

  try {
    await transporter.sendMail(options);
    return { success: true };
  } catch (error: any) {
    // error type can be narrowed down with custom error handling if desired
    return { success: false, message: error.message };
  }
};
