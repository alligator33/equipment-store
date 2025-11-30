import type { Route } from "./+types/product.$slug";
import ProductDetail from "../components/ProductDetail";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product Detail" },
    { name: "description", content: "View product details" },
  ];
}

// Mock data
const MOCK_PRODUCTS: Record<string, any> = {
  "bulldozer": {
    id: "1",
    name: "Heavy Duty Bulldozer",
    description: "<p>The <strong>Heavy Duty Bulldozer</strong> is built for the toughest jobs. Featuring a powerful engine and reinforced blade, it can handle any terrain.</p><p>Perfect for construction, mining, and land clearing.</p>",
    price: 150000,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
    specifications: "<ul><li>Engine: 300HP Turbo Diesel</li><li>Weight: 25,000 kg</li><li>Blade Width: 3.5m</li></ul>",
    shipping: "<p>Worldwide shipping available via sea freight. Delivery time 4-6 weeks.</p>"
  },
  "excavator": {
    id: "2",
    name: "Hydraulic Excavator",
    description: "<p>Our <strong>Hydraulic Excavator</strong> offers precision and power. With advanced hydraulic systems and a comfortable cab, operators can work efficiently for hours.</p>",
    price: 120000,
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2070&auto=format&fit=crop",
    specifications: "<ul><li>Bucket Capacity: 1.5 m3</li><li>Digging Depth: 6.5m</li><li>Operating Weight: 22,000 kg</li></ul>",
    shipping: "<p>Shipped in container or RORO. Assembly required upon arrival.</p>"
  }
};

export default function ProductRoute({ params }: Route.ComponentProps) {
  const { slug } = params;
  const product = MOCK_PRODUCTS[slug] || MOCK_PRODUCTS["bulldozer"]; // Fallback to bulldozer for demo

  return <ProductDetail product={product} />;
}
