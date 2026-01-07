import './globals.css'

export const metadata = {
  title: 'Zillow Clone - Property Search demo app',
  description: 'Powered by MAB Media Software Systems',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
