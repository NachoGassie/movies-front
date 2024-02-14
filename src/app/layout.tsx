import { Header } from "@/components";
import Provider from "@/server/query-provider";
import { montserrat } from "@/ui/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movies",
  description: "Movies list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className + ' antialised'}>
        <Provider>
          
          <Header/>
          <main>
            {children}
          </main>

        </Provider>
      </body>
    </html>
  );
}
