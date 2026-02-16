import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../../lib/mongodb';
import { Seller } from '../../types/user';
import { ObjectId } from 'mongodb';

// GET individual seller
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDatabase();
    
    let sellerId;
    try {
      sellerId = new ObjectId(id);
    } catch {
      return NextResponse.json(
        { error: 'Invalid seller ID' },
        { status: 400 }
      );
    }
    
    const seller = await db.collection('sellers').findOne({ _id: sellerId });
    
    if (!seller) {
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(seller, { status: 200 });
  } catch (error) {
    console.error('Error fetching seller:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seller' },
      { status: 500 }
    );
  }
}
