import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";

export const metadata = {
  title: "Medivision Care Insights"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">

        <header className="flex justify-between items-center p-4">
          <h1 className="text-lg font-semibold">
            Medivision Care Insights
          </h1>
          <ThemeToggle />
        </header>

        {children}

      </body>
    </html>
  );
}