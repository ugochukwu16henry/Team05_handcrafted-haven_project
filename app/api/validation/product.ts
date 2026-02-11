import { z } from "zod";
import { ObjectId } from "mongodb";

export const productSchema = z.object({
  title: z.string().nonempty().trim(),
  description: z.string().nonempty().trim(),
  price: z.number().nonnegative(),
  sellerId: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid seller Id",
  }),
  category: z.string().nonempty(),
  imageUrl: z.string().nonempty(),
});

export const mongoIdValidation = z.object({
  id: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid Mongodb Id",
  }),
});
