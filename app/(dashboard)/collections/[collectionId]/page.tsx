import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";
import { useEffect, useState } from "react"

const CollectionDetail = ({params}:{params: {collectionId:string}}) => {
  const [loading,setLoading] = useState(true)
  const [collectionDetails,setCollectionDetails] = useState<CollectionType | null>(null);

const getCollectionDetails = async () => {
  try {
    const res = await fetch(`/api/collections/${params.collectionId}`,{
      method: "GET"
    });
    const data = await res.json();

    if (res.ok) {
      setCollectionDetails(data);
      setLoading(false);
    }
  } catch (error) {
    console.log("collection_detail", error);
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