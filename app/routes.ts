import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("product", "routes/product.tsx"),
  route("product/:slug", "routes/product.$slug.tsx"),
] satisfies RouteConfig;
