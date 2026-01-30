import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../../../lib/mongodb';
import { Product } from '../../../types/product';

// GET all products for a specific seller
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDatabase();
    const products = await db.collection<Product>('products')
      .find({ sellerId: id })
      .toArray();
    
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching seller products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seller products' },
      { status: 500 }
    );
  }
}
