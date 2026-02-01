import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../lib/mongodb';
import { Seller } from '../types/user';
import { ObjectId } from 'mongodb'

// GET all sellers
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const sellers = await db.collection<Seller>('sellers').find({}).toArray();
    
    return NextResponse.json(sellers, { status: 200 });
  } catch (error) {
    console.error('Error fetching sellers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sellers' },
      { status: 500 }
    );
  }
}

// POST new seller (Become a Seller form)
export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase();
    const body: Seller = await request.json();

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email' },
        { status: 400 }
      );
    }

    // Check if seller with this email already exists
    const existingSeller = await db.collection<Seller>('sellers').findOne({ email: body.email });
    if (existingSeller) {
      return NextResponse.json(
        { error: 'A seller with this email already exists' },
        { status: 409 }
      );
    }

    const seller: Seller = {
      ...body,
      createdAt: new Date(),
    };

    const result = await db.collection<Seller>('sellers').insertOne(seller);
    
    return NextResponse.json(
      { ...seller, _id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating seller:', error);
    return NextResponse.json(
      { error: 'Failed to create seller' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const db = await getDatabase();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Valid seller id is required' },
        { status: 400 }
      );
    }

    const body: Partial<Seller> = await request.json();

    // Prevent updating restricted fields
    delete body._id;
    delete body.createdAt;

    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'No fields provided to update' },
        { status: 400 }
      );
    }

    const result = await db.collection<Seller>('sellers').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: body },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.value, { status: 200 });
  } catch (error) {
    console.error('Error updating seller:', error);
    return NextResponse.json(
      { error: 'Failed to update seller' },
      { status: 500 }
    );
  }
}
