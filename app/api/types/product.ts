export interface Product {
  _id?: string;
  title: string;
  description: string;
  price: number;
  sellerId: string; // Seller ID to link products to sellers
  artistName: string;
  category?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
