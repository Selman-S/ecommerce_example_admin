"use client"

import { useEffect, useState } from "react"

import Loader from "@/components/custom ui/Loader";
import ProductForm from "@/components/products/productForm";

const ProductDetail = ({params}:{params: {productId:string}}) => {
  const [loading,setLoading] = useState(true)
  const [productDetails,setProductDetails] = useState<ProductType | null>(null);

const getProductDetails = async () => {
  try {
    const res = await fetch(`/api/products/${params.productId}`,{
      method: "GET"
    });
    const data = await res.json();
    console.log("data", data);
    setProductDetails(data);
    setLoading(false);
    

  } catch (error) {
    console.log("product_detailerror", error);
  }

}

useEffect(() => {
  getProductDetails();
}, [])



  return loading ? <Loader /> : (
<ProductForm initialData={productDetails} />
    )
  
}

export default ProductDetail
