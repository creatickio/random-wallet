import React from "react";
import Meta from "./meta";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Meta />
      {children}
    </div>
  );
}
