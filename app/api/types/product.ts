import { ObjectId } from 'mongodb';

export interface Product {
  _id?: ObjectId;         // MongoDB _id as an ObjectId
  title: string;
  description: string;
  price: number;
  sellerId: ObjectId;     // Reference to Seller as ObjectId
  artistName: string;
  category?: string;
  imageUrl?: string;
  country?: string;
  size?: string;
  createdAt?: Date;
  updatedAt?: Date;
}