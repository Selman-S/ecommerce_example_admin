import { DataTable } from "@/components/custom ui/DataTable"
import { columns } from "@/components/orderItems/OrderItemsColums"
import Customer from "@/lib/models/Customer"
import Order from "@/lib/models/Order"
import Product from "@/lib/models/Product"
import { connectToDB } from "@/lib/mongoDB"

const OrderDetails = async ({ params }: { params: Promise<{ orderId: string }>}) => {
  const { orderId } = await params
  await connectToDB()

  const order = await Order.findById(orderId).populate({
    path: "products.product",
    model: Product,
  })

  if (!order) {
    return <p className="p-10">Order not found.</p>
  }

  const customerDoc = await Customer.findOne({ clerkId: order.customerClerkId })
  // Plain objects only; Mongoose docs cannot be passed into the client table.
  const orderDetails = JSON.parse(JSON.stringify(order))
  const customer = customerDoc ? JSON.parse(JSON.stringify(customerDoc)) : null
  const address = orderDetails.shippingAddress || {}

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Customer name: <span className="text-base-medium">{customer?.name || "Unknown"}</span>
      </p>
      <p className="text-base-bold">
        Shipping address: <span className="text-base-medium">{address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}</span>
      </p>
      <p className="text-base-bold">
        Total Paid: <span className="text-base-medium">${orderDetails.totalAmount}</span>
      </p>
      <p className="text-base-bold">
        Shipping rate ID: <span className="text-base-medium">{orderDetails.shippingRate}</span>
      </p>
      <DataTable columns={columns} data={orderDetails.products} searchKey="color"/>
    </div>
  )
}

export default OrderDetails
