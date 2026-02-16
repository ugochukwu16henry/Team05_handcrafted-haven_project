import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../../../lib/mongodb';
import { Product } from '../../../types/product';
import { ObjectId } from 'mongodb';
import type { Filter } from 'mongodb';

// GET products for a seller (by seller id)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sellerId } = await params;
    if (!sellerId || !ObjectId.isValid(sellerId)) {
      return NextResponse.json(
        { error: 'Invalid seller ID' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const filter: Filter<Product> = { sellerId: new ObjectId(sellerId) };
    const products = await db
      .collection<Product>('products')
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    const productsJson = products.map((p) => ({
      ...p,
      _id: p._id?.toString(),
      sellerId: typeof p.sellerId === 'string' ? p.sellerId : p.sellerId?.toString(),
    }));

    return NextResponse.json(productsJson, { status: 200 });
  } catch (error) {
    console.error('Error fetching seller products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
