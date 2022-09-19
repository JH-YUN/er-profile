import type { NextApiRequest, NextApiResponse } from 'next'
import NodeCache from 'node-cache'

const nodeCache = new NodeCache()

// api에서 케릭터 데이터 가져옴
const getCharacterSkins = async (): Promise<any> => {
  const config = {
    method: 'GET',
    headers: {
      'x-api-key': process.env.API_KEY,
      Accept: 'application/json',
    },
  }
  try {
    const response = await fetch(
      `${process.env.API_URL}/v1/data/CharacterSkin`,
      config as RequestInit
    )

    if (!response.ok) throw response.statusText

    return response.json()
  } catch (e) {
    console.log(e)
    return
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { characterCode },
  } = req

  // 케릭터 데이터 캐시여부 체크, 캐시되지 않았을 경우 새로 가져옴
  let chacedData: any[] | undefined = nodeCache.get('characterSkins')
  if (chacedData) {
    res
      .status(200)
      .json(
        chacedData.filter(
          (skins) => skins.characterCode === Number(characterCode)
        )
      )
  } else {
    const { data } = await getCharacterSkins()
    nodeCache.set('characterSkins', data)
    res
      .status(200)
      .json(
        data.filter(
          (skins: { characterCode: any }) =>
            skins.characterCode === Number(characterCode)
        )
      )
  }
}
