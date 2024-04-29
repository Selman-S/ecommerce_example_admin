type CollectionType = {
 _id: string;
 title: string;
 description: string;
 image: string;
 products: ProductType[];
};
// title: z.string().min(2).max(40),
// description: z.string().min(2).max(500).trim(),
// media: z.array(z.string()),
// category: z.string(),
// collections: z.array(z.string()),
// tags: z.array(z.string()),
// sizes: z.array(z.string()),
// colors: z.coerce.number().min(0.1),
// expense: z.coerce.number().min(0.1),

type ProductType = {
 _id: string;
 title: string;
 description: string;
 media: [string];
 category: string;
 collections:[CollectionType];
 tags: [string];
 sizes: [string];
 colors: [string];
 expense: number;
 price: number;
 createdAt: Date;
 updatedAt: Date;
};