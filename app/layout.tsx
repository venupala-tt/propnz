import "./globals.css";
import Providers from "../components/Providers"; // wraps with SessionProvider
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'

export const metadata = {
  title: "Propmatics",
  description: "Real Estate Tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
