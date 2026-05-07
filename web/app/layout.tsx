import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import {Playfair_Display , Outfit} from "next/font/google";
import { cn } from "@/lib/utils";


const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CardioCheck - Heart Attack Risk Predictor",
  description:
    "AI-powered heart attack risk assessment using 8 clinical vitals with 91% ML accuracy.",
  keywords: ["heart attack", "risk predictor", "cardiology", "AI", "machine learning"],
  authors: [{ name: "Utsav Jaiswal", url: "https://www.masterutsav.in" }, { name: "GitHub Repo", url: "https://github.com/Master-utsav/ML_3_Heart_Attack_Risk_Prediction" } , { name: "LinkedIn", url: "https://www.linkedin.com/in/master-utsav" }, { name: "Twitter", url: "https://x.com/masterutsav01" },  {name: "Master Utsav", url: "https://www.masterutsav.in" }, ],

  openGraph: {
    title: "CardioCheck - Heart Attack Risk Predictor",
    description:
      "Assess heart attack risk with our AI-powered tool using 8 clinical vitals.",
    url: process.env.DOMAIN! || "http://localhost:3000",
    siteName: "CardioCheck",
    images: [
      {
        url: "/images/screen_main.png", // main preview
        width: 1200,
        height: 630,
        alt: "CardioCheck App UI",
      }
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CardioCheck - Heart Attack Risk Predictor",
    description:
      "Assess heart attack risk with our AI-powered tool using 8 clinical vitals.",
    images: ["/images/screen_main.png"],
  },

  metadataBase: new URL(process.env.DOMAIN! || "http://localhost:3000"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body className={cn(
        "antialiased",
        playfair_display.variable,
        outfit.variable,
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}