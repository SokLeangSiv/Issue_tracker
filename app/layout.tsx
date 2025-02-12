import '@radix-ui/themes/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { Theme, ThemePanel } from '@radix-ui/themes';
import AuthProvider from './auth/page';
import QueryClientProvider from './QueryClientProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <QueryClientProvider>

          <AuthProvider>

            <Theme accentColor="violet">
              <Navbar />
              <main className='p-5'>
                {children}
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
