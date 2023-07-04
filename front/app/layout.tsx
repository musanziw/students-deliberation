import "./globals.css";
import React from "react";


export const metadata = {
  title: "UNH - Déliberation",
  description: "UNH - Déliberation"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </head>
    <body className={"font-inter"}>{children}</body>
    </html>
  );
}
