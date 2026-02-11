// GET and POST reviews for a product (used via rewrite from /api/products/:id/reviews)
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("productId");
  if (!productId) {
    return NextResponse.json(
      { error: "productId is required" },
      { status: 400 }
    );
  }
  return NextResponse.json({ message: "Not implemented yet" }, { status: 501 });
}