// Minimal root layout — [locale]/layout.tsx owns <html> and <body>
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
