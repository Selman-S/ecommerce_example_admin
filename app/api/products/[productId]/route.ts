import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId).populate({path:"collections",model:Collection});

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("product_get", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// export const POST = async (
//   req: NextRequest,
//   { params }: { params: { collectionId: string } }
// ) => {
//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 403 });
//     }
//     await connectToDB();

//     let collection = await Collection.findById(params.collectionId);

//     if (!collection) {
//       return new NextResponse("Collection not found", { status: 404 });
//     }

//     const { title, description, image } = await req.json();

//     if (!title || !image) {
//       return new NextResponse("Title and image are required", { status: 400 });
//     }

//     collection = await Collection.findByIdAndUpdate(
//       params.collectionId,
//       { title, description, image },
//       { new: true }
//     );

//     await collection.save();

//     return NextResponse.json(collection, { status: 200 });
//   } catch (error) {
//     console.log("collection_get", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };

// export const DELETE = async (
//   req: NextRequest,
//   { params }: { params: { collectionId: string } }
// ) => {
//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 403 });
//     }
//     await connectToDB();

//     await Collection.findByIdAndDelete(params.collectionId);

//     return new NextResponse("Collection deleted", { status: 200 });
//   } catch (error) {
//     console.log("collection_delete", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };