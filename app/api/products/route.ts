// GET all products, POST new products
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";
import { productSchema } from "../validation/product";

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("wdd430");

    const body = await request.json();

    const validation = productSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.flatten().fieldErrors;
      const message = Object.values(firstError).flat().join(" ") || "Validation failed";
      return NextResponse.json(
        { error: message, details: validation.error.flatten() },
        { status: 400 },
      );
    }

    const data = validation.data;
    const doc = {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      sellerId: new ObjectId(data.sellerId),
      artistName: data.artistName,
      ...(data.category ? { category: data.category } : {}),
      ...(data.imageUrl ? { imageUrl: data.imageUrl } : {}),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const product = await db.collection("products").insertOne(doc);

    return NextResponse.json(
      {
        success: true,
        message: "Product successfully created",
        productId: product.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST /api/products:", error);
    const message =
      error instanceof Error && error.message.includes("MONGODB_URI")
        ? "Database not configured. Add MONGODB_URI to .env.local"
        : "Failed to create product";
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("wdd430");

    // Get optional sellerId query parameter
    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get('sellerId');

    // Build filter query
    let filter = {};
    if (sellerId) {
      // Validate and convert to ObjectId if sellerId is provided
      if (!ObjectId.isValid(sellerId)) {
        return NextResponse.json(
          { error: 'Invalid seller ID format' },
          { status: 400 }
        );
      }
      filter = { sellerId: new ObjectId(sellerId) };
    }

    const products = await db.collection("products").find(filter).toArray();
    if (!products || products.length === 0) {
      return NextResponse.json(
        { success: true, message: "No products yet", products: [] },
        { status: 200 },
      );
    }

    const productsJson = products.map((p: Record<string, unknown>) => ({
      ...p,
      _id: (p._id as { toString?: () => string })?.toString?.() ?? p._id,
      sellerId: typeof p.sellerId === "string" ? p.sellerId : (p.sellerId as { toString?: () => string })?.toString?.() ?? p.sellerId,
      createdAt: (p.createdAt as Date)?.toISOString?.() ?? p.createdAt,
      updatedAt: (p.updatedAt as Date)?.toISOString?.() ?? p.updatedAt,
    }));

    return NextResponse.json({ success: true, products: productsJson }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/products:", error);
    const message =
      error instanceof Error && error.message.includes("MONGODB_URI")
        ? "Database not configured. Add MONGODB_URI to .env.local"
        : "Failed to fetch products";
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
