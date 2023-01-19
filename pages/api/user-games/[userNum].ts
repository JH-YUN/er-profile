import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userNum, next } = req.query

  const config = {
    method: 'GET',
    headers: {
      'x-api-key': process.env.API_KEY,
      Accept: 'application/json',
    },
  }
  try {
    const response = await fetch(
      `${process.env.API_URL}/v1/user/games/${userNum}?next=${next ?? ''}`,
      config as RequestInit
    )
    const result = await response.json()
    res.status(200).json(result)
    if (!response.ok) throw response.statusText
  } catch (e) {
    res.status(500).send(e)
  }
}
