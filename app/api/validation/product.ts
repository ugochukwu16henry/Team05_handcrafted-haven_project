import { z } from "zod";
import { ObjectId } from "mongodb";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  price: z.number().nonnegative("Price must be 0 or greater"),
  sellerId: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid seller Id",
  }),
  artistName: z.string().min(1, "Artist/Seller name is required").trim(),
  category: z.string().trim().optional().default(""),
  imageUrl: z.string().trim().optional().default(""),
});

export const mongoIdValidation = z.object({
  id: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid Mongodb Id",
  }),
});
