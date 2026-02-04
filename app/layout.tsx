import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "A marketplace for unique, handcrafted treasures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}