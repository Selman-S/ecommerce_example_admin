/**
 * Inserts a small demo catalog when those titles are missing.
 * Run: npm run seed
 */
import mongoose from "mongoose";

const uri = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  console.error("MONGODB_URL is not set");
  process.exit(1);
}

const image = "https://res.cloudinary.com/demo/image/upload/sample.jpg";

await mongoose.connect(uri, { dbName });
const db = mongoose.connection;

const Collection = db.collection("collections");
const Product = db.collection("products");
const Customer = db.collection("customers");
const Order = db.collection("orders");

const demoCollection = await Collection.findOne({ title: "Demo Spring" });
if (demoCollection) {
  console.log("Demo data already exists. Nothing inserted.");
  await mongoose.disconnect();
  process.exit(0);
}

const now = new Date();
const collectionId = new mongoose.Types.ObjectId();
const productId = new mongoose.Types.ObjectId();
const orderId = new mongoose.Types.ObjectId();

await Collection.insertOne({
  _id: collectionId,
  title: "Demo Spring",
  description: "Mock collection for local testing.",
  image,
  products: [productId],
  createdAt: now,
  updatedAt: now,
});

await Product.insertOne({
  _id: productId,
  title: "Demo Linen Shirt",
  description: "Mock product for local testing.",
  media: [image],
  category: "Shirts",
  collections: [collectionId],
  tags: ["demo", "linen"],
  sizes: ["S", "M", "L"],
  colors: ["White", "Blue"],
  price: 49.9,
  expense: 18,
  createdAt: now,
  updatedAt: now,
});

await Customer.insertOne({
  clerkId: "demo_customer_1",
  name: "Demo Customer",
  email: "demo.customer@example.com",
  orders: [orderId],
  createdAt: now,
  updatedAt: now,
});

await Order.insertOne({
  _id: orderId,
  customerClerkId: "demo_customer_1",
  products: [
    {
      product: productId,
      color: "White",
      size: "M",
      quantity: 2,
    },
  ],
  shippingAddress: {
    street: "1 Demo Street",
    city: "Istanbul",
    state: "IST",
    postalCode: "34000",
    country: "TR",
  },
  shippingRate: "demo_rate",
  totalAmount: 99.8,
  createdAt: now,
});

console.log("Inserted demo collection, product, customer, and order.");
await mongoose.disconnect();
