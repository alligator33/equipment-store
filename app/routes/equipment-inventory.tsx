import { useState, useEffect } from "react";
import type { Route } from "./+types/equipment-inventory";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Equipment Inventory - Professional Equipment Store" },
    { name: "description", content: "Browse our extensive inventory of professional equipment including bulldozers, excavators, and heavy machinery. Quality equipment at competitive prices with worldwide shipping." },
    
    // Open Graph tags
    { property: "og:title", content: "Equipment Inventory - Professional Equipment Store" },
    { property: "og:description", content: "Browse our extensive inventory of professional equipment including bulldozers, excavators, and heavy machinery." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://yoursite.com/equipment-inventory" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Equipment Inventory - Professional Equipment Store" },
    { name: "twitter:description", content: "Browse our extensive inventory of professional equipment including bulldozers, excavators, and heavy machinery." },
    
    // Additional SEO tags
    { name: "keywords", content: "equipment inventory, heavy machinery, bulldozers, excavators, construction equipment, professional equipment, buy equipment" },
    { name: "robots", content: "index, follow" },
  ];
}

interface Product {
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

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL;
        const url = `${apiUrl}/resource/products/all?page=${currentPage}&perPage=${perPage}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as { data?: Product[] } | Product[];
        console.log('API Response:', data);
        setProducts(Array.isArray(data) ? data : (data.data || []));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", padding: "2rem" }}>
      <h1>Equipment Inventory</h1>

      <nav style={{ marginBottom: "2rem" }}>
        <a href="/" style={{ marginRight: "1rem" }}>Home</a>
        <a href="/about" style={{ marginRight: "1rem" }}>About</a>
        <a href="/contact">Contact</a>
      </nav>

      {loading && <p>Loading products...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {products.length > 0 ? (
              products.map((product) => (
                <a 
                  key={product._id} 
                  href={`/equipment-inventory/${product.slug}`}
                  style={{ 
                    border: "1px solid #ddd", 
                    borderRadius: "8px", 
                    padding: "1rem", 
                    textDecoration: "none", 
                    color: "inherit",
                    display: "block"
                  }}
                >
                  {product.images && product.images[0] && (
                    <img 
                      src={product.images[0].url} 
                      alt={product.images[0].alt || product.name}
                      style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px", marginBottom: "1rem" }}
                    />
                  )}
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{product.name}</h3>
                  <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#2563eb" }}>
                    ${product.price.toLocaleString()}
                  </p>
                </a>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              type="button"
              onClick={() => setCurrentPage(prev => prev + 1)}
              style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
