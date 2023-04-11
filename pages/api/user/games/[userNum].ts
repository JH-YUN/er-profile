import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userNum, next } = req.query

  const response = await axios(
    `${process.env.API_URL}/v1/user/games/${userNum}?next=${next ?? ''}`,
    {
      headers: {
        'x-api-key': process.env.API_KEY,
        Accept: 'application/json',
      },
    }
  )
  res.status(response.status).json(response.data)
}
