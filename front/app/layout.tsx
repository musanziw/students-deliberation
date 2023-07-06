import "./globals.css";
import React from "react";

export const metadata = {
  title: "UNH - Déliberation",
  description: "UNH - Déliberation"

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className={"font-inter bg-gray-50 text-gray-600"}>{children}</body>
    </html>
  );
}
