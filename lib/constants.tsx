import {
 LayoutDashboard,
 Shapes,
 ShoppingBag,
 Tag,UserRound,
} from 'lucide-react'

export const navLinks = [
 {
  url: "/",
  icon: <LayoutDashboard />,
  label: "Dashboard",
 },
 {
  url: "/collections",
  icon: <Shapes />,
  label: "Collections",
 },
 {
  url: "/products",
  icon: <Tag />,
  label: "Products",
 },
 {
  url: "/orders",
  icon: <ShoppingBag />,
  label: "Orders",
 },
 {
  url: "/customers",
  icon: <UserRound />,
  label: "Customers",
 },
]