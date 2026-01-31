import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../../../lib/mongodb';
import { Product } from '../../../types/product';
import { Seller } from '../../../types/user';
import { ObjectId } from 'mongodb';

// Find and display the seller of a specific product
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the route param
    const { id: productId } = await params;
    const db = await getDatabase();

    // Find the product by ObjectId
    const product = await db
      .collection<Product>('products')
      .findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Find the seller using ObjectId from product.sellerId
    const seller = await db
      .collection<Seller>('sellers')
      .findOne({ _id: new ObjectId(product.sellerId) });

    if (!seller) {
      return NextResponse.json(
        { error: 'Seller not found for this product' },
        { status: 404 }
      );
    }

    // Convert ObjectIds to strings for JSON response
    const sellerJson = {
      ...seller,
      _id: seller._id?.toString(),
      userId: seller.userId?.toString(),
    };

    return NextResponse.json(sellerJson, { status: 200 });
  } catch (error) {
    console.error('Error finding seller for this product:', error);
    return NextResponse.json(
      { error: 'Failed to find seller' },
      { status: 500 }
    );
  }
}
