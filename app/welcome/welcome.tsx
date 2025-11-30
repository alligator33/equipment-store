import { Link } from "react-router";

export function Welcome() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Welcome to React Router!
      </h1>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Get started by editing <code>app/routes/_index.tsx</code>
      </p>

      <nav style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Link
          to="/about"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3b82f6",
            color: "white",
            textDecoration: "none",
            borderRadius: "0.25rem",
          }}
        >
          About
        </Link>
        <Link
          to="/product"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#10b981",
            color: "white",
            textDecoration: "none",
            borderRadius: "0.25rem",
          }}
        >
          Products
        </Link>
        <Link
          to="/contact"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#a855f7",
            color: "white",
            textDecoration: "none",
            borderRadius: "0.25rem",
          }}
        >
          Contact
        </Link>
      </nav>
    </main>
  );
}
