import React from "react";
import Meta from "./Meta";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Meta />
      {children}
    </div>
  );
}
