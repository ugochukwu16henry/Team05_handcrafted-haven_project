import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { mongoIdValidation } from "../../validation/product";

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

    const validation = mongoIdValidation.safeParse({ id });
    console.log(validation);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 },
      );
    }

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
        error: "Failed to get product",
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

export async function DELETE(request: NextRequest, { params }: PageProps) {
  const { id } = await params;

  try {
    const client = await clientPromise;
    const db = client.db("wdd430");

    const product = await db
      .collection("products")
      .findOneAndDelete({ _id: new ObjectId(id) });

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
        message: "Product successfully deleted",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(`Error in DELETE /api/products/:id ${error}`);
    return Response.json(
      {
        error: "Failed to delete product",
      },
      {
        status: 500,
      },
    );
  }
}
