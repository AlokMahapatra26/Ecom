import { emailVerificationLink } from "@/email/emailVerifictionLink";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import { z } from "zod";



export async function POST(request: Request) {
  try {
    await connectDB();

    // Type inference from Zod schema
    const validationSchema = zSchema.pick({
    name: true,
    email: true,
    password: true,
    });
    type ValidatedData = z.infer<typeof validationSchema>;

    // Get the payload
    const payload = await request.json();

    // Parse and validate
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(false, 401, "Invalid or missing input field", validatedData.error);
    }

    // Only access validatedData.data after success === true
    const { name, email, password } = validatedData.data as ValidatedData;

    // Check if user already exists
    const CheckUser = await UserModel.exists({ email });
    if (CheckUser) {
      return response(true, 409, "User already exist");
    }

    // Register new user
    const NewRegistration = new UserModel({
      name,
      email,
      password,
    });

    await NewRegistration.save();

    // JWT token creation
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);

    const token = await new SignJWT({ userId: NewRegistration._id.toString() })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    await sendMail("Email Verification from Rudra Silk Saree" , 
        email , emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`)
    )

    return response(true , 200 , "Registration success , Please verify your email address")

  } catch (error) {
    catchError(error)
  }
}
