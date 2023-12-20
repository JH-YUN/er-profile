import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { userNum: string; seasonId: string } }
) {
  const { userNum, seasonId } = params

  const res = await fetch(
    `${process.env.API_URL}/v1/user/stats/${userNum}/${seasonId}`,
    {
      headers: {
        'x-api-key': process.env.API_KEY || '',
      },
      cache: 'no-store',
    }
  )

  if (res.ok) {
    const result = await res.json()
    return NextResponse.json(result)
  } else {
    return new Response('API ERROR', { status: 500 })
  }
}
