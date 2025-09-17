import "./globals.css";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Providers from "../components/Providers"; // ✅ relative path, not "/app/providers"

export const metadata = {
  title: "Propmatics",
  description: "Real Estate Tools",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
