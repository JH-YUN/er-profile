import { NextResponse } from 'next/server'

export async function GET(req: Request, params: { gameId: string }) {
  const { gameId } = params
  try {
    const response = await fetch(`${process.env.API_URL}/v1/games/${gameId}`, {
      headers: {
        'x-api-key': process.env.API_KEY || '',
        Accept: 'application/json',
      },
    })
    const result = await response.json()
    if (!response.ok) throw response.statusText
    return NextResponse.json(result)
  } catch (e) {
    return new Response('API ERROR', { status: 500 })
  }
}
