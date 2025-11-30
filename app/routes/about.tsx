import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - React Router App" },
    { name: "description", content: "About our application" },
  ];
}

export default function About() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", padding: "2rem" }}>
      <h1>About Page</h1>
      <p>This is the about page, demonstrating file-based routing in React Router v7.</p>
      <nav>
        <a href="/" style={{ marginRight: "1rem" }}>Home</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  );
}
