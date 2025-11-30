import type { Route } from "./+types/equipment-inventory.$slug";
import { useLoaderData } from "react-router";
import ProductDetail from "../components/ProductDetail";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product Detail" },
    { name: "description", content: "View product details" },
  ];
}

interface ApiProduct {
  _id: string;
  uuid: string;
  name: string;
  slug: string;
  price: number;
  description?: string;
  specifications?: string;
  shipping?: string;
  images?: Array<{
    url: string;
    alt?: string;
  }>;
  [key: string]: unknown;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  specifications?: string;
  shipping?: string;
  related_products?: Product[];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const apiUrl = import.meta.env.VITE_API_URL;
  
  try {
    const url = `${apiUrl}/resource/products/one/${slug}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json() as { data?: ApiProduct } | ApiProduct;
    const apiProduct = 'data' in data ? data.data : data;
    
    if (!apiProduct) {
      throw new Error('Product not found in response');
    }
    
    // Transform API product to match ProductDetail component's expected format
    const product: Product = {
      id: (apiProduct as ApiProduct)._id || (apiProduct as ApiProduct).uuid,
      name: (apiProduct as ApiProduct).name,
      description: (apiProduct as ApiProduct).description || '',
      price: (apiProduct as ApiProduct).price,
      image: (apiProduct as ApiProduct).images?.[0]?.url || '',
      specifications: (apiProduct as ApiProduct).specifications,
      shipping: (apiProduct as ApiProduct).shipping,
    };
    
    return { product };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Response("Product not found", { status: 404 });
  }
}

export default function ProductRoute() {
  const { product } = useLoaderData<typeof loader>();

  return <ProductDetail product={product} />;
}
