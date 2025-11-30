import { useState, useEffect } from "react";
import { useParams } from "react-router";
import type { Route } from "./+types/product.$slug";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.slug} - Product Details` },
    { name: "description", content: "Product details" },
  ];
}

interface ProductDetail {
  _id: string;
  uuid: string;
  name: string;
  slug: string;
  price: number;
  images?: Array<{
    url: string;
    alt?: string;
  }>;
  [key: string]: unknown;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL;
        const url = `${apiUrl}/resource/products/one/${slug}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Product Detail Response:', data);
        setProduct(data.data || data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <p style={{ color: "red" }}>Error: {error}</p>
        <a href="/product">Back to Products</a>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <p>Product not found</p>
        <a href="/product">Back to Products</a>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <nav style={{ marginBottom: "2rem" }}>
        <a href="/product" style={{ marginRight: "1rem" }}>← Back to Products</a>
        <a href="/" style={{ marginRight: "1rem" }}>Home</a>
      </nav>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div>
          {product.images && product.images.length > 0 && (
            <img 
              src={product.images[0].url} 
              alt={product.images[0].alt || product.name}
              style={{ width: "100%", borderRadius: "8px", border: "1px solid #ddd" }}
            />
          )}
        </div>

        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{product.name}</h1>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#2563eb", marginBottom: "2rem" }}>
            ${product.price.toLocaleString()}
          </p>
          
          <button 
            style={{ 
              padding: "0.75rem 2rem", 
              fontSize: "1rem", 
              backgroundColor: "#2563eb", 
              color: "white", 
              border: "none", 
              borderRadius: "6px", 
              cursor: "pointer" 
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
