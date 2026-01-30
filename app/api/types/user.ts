export interface User {
  _id?: string;
  email: string;
  password?: string; // Should be hashed in production
  name: string;
  role?: 'user' | 'seller' | 'admin';
  createdAt?: Date;
}

export interface Seller {
  _id?: string;
  userId?: string; // Link to User if needed
  name: string;
  email: string;
  businessName?: string;
  description?: string;
  location?: string;
  phone?: string;
  createdAt?: Date;
}
