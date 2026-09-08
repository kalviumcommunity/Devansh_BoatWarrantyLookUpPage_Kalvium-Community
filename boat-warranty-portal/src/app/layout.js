import GlobalStyles from "@/components/GlobalStyles";

export const metadata = {
  title: "Boat Warranty Portal",
  description: "Warranty portal dashboard and management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalStyles />
        {children}
      </body>
    </html>
  );
}
