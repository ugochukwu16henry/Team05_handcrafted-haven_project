import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { mongoIdValidation, productSchema } from "../../validation/product";

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
        { success: false, message: "No product found" },
        { status: 404 },
      );
    }

    const productJson = {
      ...product,
      _id: (product as { _id?: { toString: () => string } })._id?.toString?.() ?? product._id,
      sellerId: typeof product.sellerId === "string" ? product.sellerId : (product as { sellerId?: { toString: () => string } }).sellerId?.toString?.() ?? product.sellerId,
      createdAt: (product as { createdAt?: Date }).createdAt?.toISOString?.() ?? (product as { createdAt?: string }).createdAt,
      updatedAt: (product as { updatedAt?: Date }).updatedAt?.toISOString?.() ?? (product as { updatedAt?: string }).updatedAt,
    };

    let owner = null;
    const sid = product.sellerId;
    if (sid) {
      const sellerIdObj = typeof sid === "string" ? new ObjectId(sid) : sid;
      const seller = await db.collection("sellers").findOne({ _id: sellerIdObj });
      if (seller) {
        owner = {
          _id: (seller as { _id?: { toString: () => string } })._id?.toString?.(),
          name: (seller as { name?: string }).name,
          email: (seller as { email?: string }).email,
          businessName: (seller as { businessName?: string }).businessName,
          location: (seller as { location?: string }).location,
        };
      }
    }

    return Response.json(
      { success: true, product: productJson, owner },
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

    const idValidation = mongoIdValidation.safeParse({ id });

    console.log(idValidation);

    if (!idValidation.success) {
      return NextResponse.json(
        { error: idValidation.error.format() },
        { status: 400 },
      );
    }

    const body = await request.json();

    const validation = productSchema.safeParse(body);

    console.log(validation);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 },
      );
    }

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

    const idValidation = mongoIdValidation.safeParse({ id });

    if (!idValidation.success) {
      return NextResponse.json(
        { error: idValidation.error.format() },
        { status: 400 },
      );
    }

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
