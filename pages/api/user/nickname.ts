import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query
  const response = await axios(
    `${process.env.API_URL}/v1/user/nickname?query=${query}`,
    {
      headers: {
        'x-api-key': process.env.API_KEY,
        Accept: 'application/json',
      },
    }
  )
  res.status(response.status).json(response.data)
}
