import "./globals.css";

export const metadata = {
  title: "Peaceful Town Portfolio",
  description: "A calm, lush green town exploration portfolio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#BEE3F8] text-[#243124]">
        {/* App root: scenes will handle their own backgrounds */}
        <div className="min-h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
