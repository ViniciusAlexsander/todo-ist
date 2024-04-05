import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authOptions } from "./api/auth/[...nextauth]/options";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo-ist",
  description: "Criado por Caçambito",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <ToastContainer position="top-right" theme="colored" />
        <Providers>
          {session && <Header />}

          {children}
        </Providers>
      </body>
    </html>
  );
}
