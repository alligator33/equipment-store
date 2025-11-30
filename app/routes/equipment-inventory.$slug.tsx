import type { Route } from "./+types/equipment-inventory.$slug";
import { useLoaderData } from "react-router";
import ProductDetail from "../components/ProductDetail";

export async function meta({ params }: Route.MetaArgs) {
  const { slug } = params;
  const apiUrl = import.meta.env.VITE_API_URL;
  
  try {
    const url = `${apiUrl}/resource/products/one/${slug}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      return [
        { title: "Product Not Found - Equipment Store" },
        { name: "description", content: "The requested product could not be found." },
      ];
    }
    
    const data = await response.json() as { data?: ApiProduct } | ApiProduct;
    const apiProduct = 'data' in data ? data.data : data;
    
    if (!apiProduct) {
      return [
        { title: "Product Not Found - Equipment Store" },
        { name: "description", content: "The requested product could not be found." },
      ];
    }
    
    const product = apiProduct as ApiProduct;
    const description = product.description 
      ? product.description.replace(/<[^>]*>/g, '').substring(0, 160) 
      : `Buy ${product.name} for $${product.price.toLocaleString()}. Professional equipment store.`;
    const imageUrl = product.images?.[0]?.url || '';
    
    return [
      { title: `${product.name} - Equipment Store` },
      { name: "description", content: description },
      
      // Open Graph tags for social media sharing
      { property: "og:title", content: `${product.name} - Equipment Store` },
      { property: "og:description", content: description },
      { property: "og:type", content: "product" },
      { property: "og:image", content: imageUrl },
      { property: "og:url", content: `https://yoursite.com/equipment-inventory/${slug}` },
      { property: "product:price:amount", content: product.price.toString() },
      { property: "product:price:currency", content: "USD" },
      
      // Twitter Card tags
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${product.name} - Equipment Store` },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      
      // Additional SEO tags
      { name: "keywords", content: `${product.name}, equipment, ${slug}, buy equipment, professional equipment` },
      { name: "robots", content: "index, follow" },
    ];
  } catch (error) {
    console.error('Error fetching product for meta:', error);
    return [
      { title: "Equipment Store" },
      { name: "description", content: "Professional equipment store" },
    ];
  }
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
