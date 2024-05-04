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

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await connectToDB();

    let product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    
    
    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();
    
    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }
    
    
      // added collections
    
      const addedCollections = collections.filter((collectionId:string) => {
        return !product.collections.includes(collectionId);
      });

      // removed collections

      const removedCollections = product.collections.filter((collectionId:string) => {
        return !collections.includes(collectionId);
      });

      await Promise.all([
        //update collections
        ...addedCollections.map((collectionId:string) => 
          Collection.findByIdAndUpdate(collectionId, {
            $push: { products: product._id },
          })
        ),
      ]);
      
      await Promise.all([
        //update collections
        ...removedCollections.map((collectionId:string) => 
           Collection.findByIdAndUpdate(collectionId, {
            $pull: { products: product._id },
          })
          ),
      ]);

      // update product
    const updateProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        media,
        category,
        collections,
        tags,
        sizes,
        colors,
        price,
        expense,
      },
      { new: true }
    ).populate({path:"collections",model:Collection});

    await updateProduct.save();

    return NextResponse.json(updateProduct, { status: 200 });
  } catch (error) {
    console.log("product_post", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await connectToDB();

    let product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    await Product.findByIdAndDelete(params.productId);


    // update other collections
    await Promise.all(
      product.collections.map((collectionId:string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      )
    );

    return new NextResponse("Product deleted", { status: 200 });
  } catch (error) {
    console.log("product_delete", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
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
