import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { userNum: string } }
) {
  const { userNum } = params

  const { searchParams } = new URL(req.url)
  const next = searchParams.get('next')
  try {
    const response = await fetch(
      `${process.env.API_URL}/v1/user/games/${userNum}?next=${next ?? ''}`,
      {
        headers: {
          'x-api-key': process.env.API_KEY || '',
        },
        cache: 'no-store',
      }
    )
    const result = await response.json()
    if (!response.ok) throw response.statusText
    return NextResponse.json(result)
  } catch (e) {
    return new Response(`API ERROR : ${e}`, { status: 500 })
  }
}
