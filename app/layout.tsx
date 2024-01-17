import '@/styles/globals.css'
import Providers from './providers'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// dayjs 기본 설정
dayjs.locale('ko')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Seoul')

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
