<<<<<<< HEAD
// GET all products, POST new products
import { NextResponse } from "next/server";
=======
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("wdd430");

    const body = await request.json();
    const product = await db.collection("products").insertOne({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Response.json(
      {
        success: true,
        message: "Product successfully created",
        productId: product.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(`Error in POST /api/products(: ${error}`);
    return Response.json(
      {
        error: "Failed to create product",
      },
      {
        status: 500,
      },
    );
  }
}
>>>>>>> b36577c4bd5b52e3ffb5a9dd40b75f83054a29b0

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("wdd430");

    const products = await db.collection("products").find({}).toArray();
    if (!products) {
      return Response.json(
        {
          success: true,
          message: "No products yet",
        },
        { status: 200 },
      );
    }

    return Response.json(
      {
        success: true,
        products: products,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(`Error in GET/api/products: ${error}`);
    return Response.json(
      {
        error: "Failed to create product",
      },
      {
        status: 500,
      },
    );
  }
}
