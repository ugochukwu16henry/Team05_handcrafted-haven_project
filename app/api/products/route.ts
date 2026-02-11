// GET all products, POST new products
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../lib/mongodb";
import { productSchema } from "../validation/product";

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("wdd430");

    const body = await request.json();

    const validation = productSchema.safeParse(body);
    console.log(validation);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const product = await db.collection("products").insertOne({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

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

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("wdd430");

    const products = await db.collection("products").find({}).toArray();
    if (!products || products.length === 0) {
      return NextResponse.json(
        { success: true, message: "No products yet", products: [] },
        { status: 200 },
      );
    }

    return NextResponse.json({ success: true, products }, { status: 200 });
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
