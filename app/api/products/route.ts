import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../lib/mongodb';
import { Product } from '../types/product';

// GET all products
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const searchParams = request.nextUrl.searchParams;
    const sellerId = searchParams.get('sellerId');

    let query = {};
    if (sellerId) {
      query = { sellerId };
    }

    const products = await db.collection<Product>('products').find(query).toArray();
    
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST new product
export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase();
    const body: Product = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.price || !body.sellerId || !body.artistName) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, price, sellerId, artistName' },
        { status: 400 }
      );
    }

    const product: Product = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection<Product>('products').insertOne(product);
    
    return NextResponse.json(
      { ...product, _id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
