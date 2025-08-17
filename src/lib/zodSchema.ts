import { z } from "zod";

const strongPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password can't be longer than 64 characters")
  .regex(/[A-Z]/, "Must include at least one uppercase letter")
  .regex(/[a-z]/, "Must include at least one lowercase letter")
  .regex(/[0-9]/, "Must include at least one number")
  .regex(/[^A-Za-z0-9]/, "Must include at least one special character");

const strictNameSchema = z.string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(64, "Name must be at most 64 characters")
  .regex(
    /^[A-Za-z\s'-]+$/,
    "Name can only contain letters, spaces, hyphens, and apostrophes"
  );

const otpSchema = z.string().regex(/^\d{6}$/, {
  message: "OTP must be exactly 6 digits",
});  

export const zSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: strongPassword,
    name: strictNameSchema,
    otp: otpSchema,
    _id : z.string().min(3 , '_id is required'),
    alt : z.string().min(3 , 'alt is required'),
    title : z.string().min(3 , 'title is required'),
    slug : z.string().min(3 , "Slug is required"),
    category  :z.string().min(3 , "Category is required"),
    mrp: z.union([
      z.number().positive("Expected positive value , received negetived"),
      z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val >= 0 , "Please enter a valid number")
    ]),
    sellingPrice: z.union([
      z.number().positive("Expected positive value , received negetived"),
      z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val >= 0 , "Please enter a valid number")
    ]),
    discountPercentage: z.union([
      z.number().positive("Expected positive value , received negetived"),
      z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val >= 0 , "Please enter a valid number")
    ]),
    description: z.string().min(3 , "Description is required"),
    media : z.array(z.string()),
    product: z.string().min(3 , "Product is required"),
    color: z.string().min(3 , "Color is required"),
    size: z.string().min(1 , "Size is required"),
    sku: z.string().min(3 , "SKU is required")
  })
