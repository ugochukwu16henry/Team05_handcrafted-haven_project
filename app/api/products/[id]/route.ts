import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: PageProps) {
  const { id } = await params;

  try {
    const client = await clientPromise;
    const db = client.db("wdd430");

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return Response.json(
        {
          success: false,
          message: "No product found",
        },
        { status: 400 },
      );
    }

    return Response.json(
      {
        success: true,
        product: product,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(`Error in /api/products/:id ${error}`);
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

export async function PUT(request: NextRequest, { params }: PageProps) {
  const { id } = await params;
  try {
    const client = await clientPromise;
    const db = client.db("wdd430");

    const body = await request.json();
    const product = await db.collection("products").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: { ...body, updatedAt: new Date() },
      },
      {
        returnDocument: "after",
      },
    );

    return Response.json(
      {
        success: true,
        message: "Product successfully updated",
        product: product,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(`Error in PUT /api/products/:id ${error}`);
    return Response.json(
      {
        error: "Failed to update product",
      },
      {
        status: 500,
      },
    );
  }
}
