import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest,{params}:{params:{collectionId:string}}) => {
  try {
    await connectToDB();
    const collection = await Collection.findById(params.collectionId);
    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }
    return new NextResponse(collection, { status: 200 });
  } catch (error) {
    console.log("collection_get",error);
    return new NextResponse("Internal Server Error",{ status: 500 });
  }
};

export const DELETE = async (req: NextRequest,{params}:{params:{collectionId:string}}) => {

 try {
  const {userId} = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  await connectToDB();

 await Collection.findByIdAndDelete(params.collectionId);

 return new NextResponse("Collection deleted", { status: 200 });
  
 } catch (error) {
  console.log("collection_delete",error);
  return new NextResponse("Internal Server Error",{ status: 500 });
  
 }

}