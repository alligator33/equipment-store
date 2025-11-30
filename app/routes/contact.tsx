import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact - React Router App" },
    { name: "description", content: "Get in touch with us" },
  ];
}

export default function Contact() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", padding: "2rem" }}>
      <h1>Contact Page</h1>
      <p>This is the contact page. File-based routing is working!</p>
      <nav>
        <a href="/" style={{ marginRight: "1rem" }}>Home</a>
        <a href="/about">About</a>
      </nav>
    </div>
  );
}
