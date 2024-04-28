import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
 

const ImageUploader = () => {
  return (
   <CldUploadWidget uploadPreset="ronb0alq">
  {({ open }) => {
    return (
      <Button onClick={() => open()} className='bg-gray-500'>
       <Plus /> Upload Image
      </Button>
    );
  }}
</CldUploadWidget>
  )
}

export default ImageUploader
