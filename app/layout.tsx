import '@/styles/globals.css'
import Providers from './providers'

export const metadata = {
  title: 'ER-PROFILE :: 이터널리턴 전적검색',
  description: '이터널리턴 전적검색',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
