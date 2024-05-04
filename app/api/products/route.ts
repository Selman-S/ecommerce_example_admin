import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const { title, description, media, category, collections,
      tags, sizes, colors, expense,price } = await req.json();


    if (!title || !description|| !media|| !category|| !price|| !expense) {
      return new NextResponse(" Not enough data to create", { status: 400 });
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

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await Product.find({}).sort({ createdAt: "desc" }).populate({path: 'collections',model: Collection});

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log("products get", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
