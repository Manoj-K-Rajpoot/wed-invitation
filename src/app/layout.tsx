import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sajal & Aaradhya • Royal Wedding Invitation",
  description:
    "Cordially inviting you to the sacred wedding celebrations of Sajal Singhania and Aaradhya Sharma at The Oberoi Udaivilas, Udaipur.",
  keywords: [
    "Wedding Invitation",
    "Sajal and Aaradhya Wedding",
    "Indian Wedding",
    "Royal Wedding Udaipur",
    "Oberoi Udaivilas",
  ],
  openGraph: {
    title: "Sajal & Aaradhya • Royal Wedding Invitation",
    description: "Join us in celebrating our sacred union in the royal city of lakes, Udaipur.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#580B1E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
