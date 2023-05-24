import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar';


export const metadata = {
  title: 'Jairbnb',
  description: 'Airbnb clone created by Jorge Wolburg',
}

const font = Nunito({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
