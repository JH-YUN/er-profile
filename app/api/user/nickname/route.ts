import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')
  const res = await fetch(
    `${process.env.API_URL}/v1/user/nickname?query=${query}`,
    {
      headers: {
        'x-api-key': process.env.API_KEY || '',
      },
    }
  )

  if (res.ok) {
    const result = await res.json()
    return NextResponse.json(result)
  } else {
    return new Response('API ERROR', { status: 500 })
  }
}
