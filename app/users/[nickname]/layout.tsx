import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
  { params }: { params: { nickname: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `ER-PROFILE :: ${decodeURI(params.nickname)} 님의 전적`,
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
