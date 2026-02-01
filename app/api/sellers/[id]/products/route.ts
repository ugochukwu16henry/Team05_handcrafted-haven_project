import { NextResponse } from 'next/server';
import { getDatabase } from '../../../lib/mongodb';
import { Product } from '../../../types/product';
import { Seller } from '../../../types/user';
import { ObjectId } from 'mongodb';

// Find and display all sellers based upon a product type.
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const db = await getDatabase();

    //Find the product
    const product = await db
      .collection<Product>('products')
      .findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Find the sellers with this product
    const seller = await db
      .collection<Seller>('sellers')
      .findOne({ _id: new ObjectId(product.sellerId) });

    if (!seller) {
      return NextResponse.json(
        { error: 'Seller not found for this product' },
        { status: 404 }
      );
    }

    return NextResponse.json(seller, { status: 200 });
  } catch (error) {
    console.error('Error finding seller for this product:', error);
    return NextResponse.json(
      { error: 'Failed to find seller' },
      { status: 500 }
    );
  }
}