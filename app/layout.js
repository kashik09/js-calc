import './globals.css'

export const metadata = {
  title: 'JavaScript Calculator',
  description: 'A calculator',
  keywords: ['calculator', 'javascript', 'nextjs', 'react', 'math'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body>{children}</body>
    </html>
  )
}
