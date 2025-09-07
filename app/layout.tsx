import "./globals.css";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Providers from "./providers"; // ✅ relative path, not "/app/providers"

export const metadata = {
  title: "Propmatics",
  description: "Real estate portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
                <Navbar />
        <Providers>{children}</Providers>
                <Footer />
      </body>
    </html>
  );
}
