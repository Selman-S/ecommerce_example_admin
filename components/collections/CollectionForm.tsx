"use client";

import { z } from "zod";
import { Separator } from "../ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUploader from "../custom ui/ImageUploader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(2).max(40),
  description: z.string().min(2).max(500).trim(),
  image: z.string(),
});

const CollectionForm = () => {
  const [loading, setloading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  //  onchange

  form.watch((value) => {
    // console.log(value);
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setloading(true)
      const res = await fetch("/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setloading(false)
        toast.success("Collection Created");
        router.push("/collections");
      } 

    } catch (error) {
      setloading(false)
      toast.error("Failed to create collection");
      console.log("collection_post", error);
      
      
    }

    console.log(values);
  };
  return (
    <div className="p-10">
      <p className="text-xl font-bold">Create Collection</p>
      <Separator className="bg-gray-600 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="description" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUploader
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div  className="flex gap-10">

          <Button type="submit" className="bg-blue-1 text-white">Submit</Button>
          <Button type="button" onClick={()=>router.push('/collections')} className="bg-blue-1 text-white">Discard</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
