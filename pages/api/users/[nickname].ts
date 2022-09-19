import type { NextApiRequest, NextApiResponse } from 'next'

let lastSeason: null | string = null

const getUserNumber = async (nickname: string) => {
  const config = {
    method: 'GET',
    headers: {
      'x-api-key': process.env.API_KEY,
      Accept: 'application/json',
    },
  }

  const response = await fetch(
    `${process.env.API_URL}/v1/user/nickname?${new URLSearchParams({
      query: nickname,
    })}`,
    config as RequestInit
  )

  const result = await response.json()
  const {
    code,
    message,
    user: { userNum },
  } = result

  return { code, message, userNum }
}

const getSeasons = async () => {
  console.log('get lastseason!!!')
  const config = {
    method: 'GET',
    headers: {
      'x-api-key': process.env.API_KEY,
      Accept: 'application/json',
    },
  }

  const response = await fetch(
    `${process.env.API_URL}/v1/data/Season`,
    config as RequestInit
  )

  const result = await response.json()

  return result
}

const getUserStats = async (
  userNum: string | number,
  seasonId: string | number
) => {
  const config = {
    method: 'GET',
    headers: {
      'x-api-key': process.env.API_KEY,
      Accept: 'application/json',
    },
  }

  const response = await fetch(
    `${process.env.API_URL}/v1/user/stats/${userNum}/${seasonId}`,
    config as RequestInit
  )

  const result = await response.json()
  console.log(result)
  return userNum
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { nickname },
  } = req
  let msg = 'not call season api'
  const { userNum } = await getUserNumber(nickname as string)
  if (lastSeason === null) {
    lastSeason = (await getSeasons()).data.at(-1).seasonID
    msg = 'call season api'
  }
  await getUserStats(userNum, lastSeason as string)
  res.status(200).json({ name: 'John Doe', msg: msg })
}
