import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();
    // title: "",
    // description: "",
    // media: [],
    // category: "",
    // collections: [],
    // tags: [],
    // sizes: [],
    // colors: 0.1,
    // expense: 0.1,

    const { title, description, media, category, collections,
      tags, sizes, colors, expense,price } = await req.json();


  

   

    if (!title || !description|| !media|| !category|| !price|| !expense) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      expense,
      price,
    });

    await newProduct.save();

    return  NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log("products _post", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// export const GET = async (req: NextRequest) => {
//   try {
//     await connectToDB();

//     const collections = await Collection.find().sort({ createdAt: "desc" });

//     return NextResponse.json(collections, { status: 200 });
//   } catch (error) {
//     console.log("collection_get", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };
