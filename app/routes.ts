import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("equipment-inventory", "routes/equipment-inventory.tsx"),
  route("equipment-inventory/:slug", "routes/equipment-inventory.$slug.tsx"),
  route("cart", "routes/cart.tsx"),
] satisfies RouteConfig;
