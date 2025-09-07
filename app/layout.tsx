import "./globals.css";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
