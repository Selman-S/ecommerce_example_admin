"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Plus } from "lucide-react"

import { columns } from "@/components/collections/CollectionColumns"
import { DataTable } from "@/components/custom ui/DataTable"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"


const Collections = () => {

const [loading,setLoading] = useState(true)
const [collections,setCollections] = useState([])

const router = useRouter()

const getCollections = async () => {
  
  try {
    const res = await fetch("/api/collections",{
      method: "GET"
    
    })
    const data = await res.json()
    console.log(data);
    
    setCollections(data)
    setLoading(false)
  } catch (error) {
    console.log("get collections",error)
  }
}

useEffect(() => {
  getCollections()
}, [])

console.log(collections);

  return (
<div className="px-10 py-5">
<div className="flex justify-between items-center">
 <p className="text-heading2-bold">Collections</p>
 <Button className="bg-blue-1 text-white" onClick={()=>router.push("/collections/new")}>
   <Plus className="w-4 h-4 mr-2"/>
   Create Collection
 </Button>
 </div>
 <Separator className="bg-grey-1 my-4" />
  <DataTable columns={columns} data={collections} searchKey="title" />
</div>

  )
}

export default Collections
