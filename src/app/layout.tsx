import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "DeepMathAI — Research Group | Naresuan University",
  description:
    "Interdisciplinary Research Group on Deep Mathematical Modeling for Machine Learning and Artificial Intelligence. Frontier Research and Innovation Cluster at Naresuan University.",
  keywords: [
    "DeepMathAI", "Mathematical AI", "Machine Learning", "Optimization",
    "Deep Learning", "Naresuan University", "Research Group",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a1628] text-white antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
