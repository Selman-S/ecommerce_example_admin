import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import { ValueOf } from "next/dist/shared/lib/constants";
import Image from "next/image";

interface ImageUploaderProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUploader = ({ value, onChange, onRemove }: ImageUploaderProps) => {
  const onUpload = (results: any) => {
    // You can now access the uploaded image URL via results.info.url
    const url = results.info.url;
    onChange(url);
    console.log(value);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div
          key={url}
          className="relative w-48 h-48 "
          >
            <div
            className="absolute top-0 right-0 z-10"
            >
            <Button
              onClick={() => onRemove(url)}
              size="sm"
              className="bg-red-1 text-white">
                <Trash className="h-4 w-4  font-bold" /> 
              </Button>

            </div>

          <Image
            src={url}
            alt="Collection Image"
            width={200}
            height={200}
            className="object-cover rounded-lg"
            />
            </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="ronb0alq" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button type="button" onClick={() => open()} className="bg-gray-500 text-white">
              <Plus className="h-4 w-4 mr-2 font-bold" /> Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;
