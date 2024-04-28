"use client"

import { useEffect, useState } from "react"

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";

const CollectionDetail = ({params}:{params: {collectionId:string}}) => {
  const [loading,setLoading] = useState(true)
  const [collectionDetails,setCollectionDetails] = useState<CollectionType | null>(null);

const getCollectionDetails = async () => {
  try {
    const res = await fetch(`/api/collections/${params.collectionId}`,{
      method: "GET"
    });
    const data = await res.json();
    console.log("data", data);
    setCollectionDetails(data);
    setLoading(false);
    

  } catch (error) {
    console.log("collection_detailerror", error);
  }

}

useEffect(() => {
  getCollectionDetails();
}, [])



  return loading ? <Loader /> : (
<CollectionForm initialData={collectionDetails} />
    )
  
}

export default CollectionDetail
