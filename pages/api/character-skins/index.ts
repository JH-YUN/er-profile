import type { NextApiRequest, NextApiResponse } from 'next'
import NodeCache from 'node-cache'

const nodeCache = new NodeCache()

// api에서 케릭터 데이터 가져옴
const getCharacterSkins = async () => {
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

    // 케릭터 이름 한글화
    const skins = await response.json()
    const l10nResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/l10n/Korean`
    )
    if (!l10nResponse.ok) throw l10nResponse.statusText
    const l10nData = await l10nResponse.json()

    return skins.data.map((el: { code: any }) => {
      return { ...el, name: l10nData[`Skin/Name/${el.code}`] }
    })
  } catch (e) {
    console.log(e)
    return
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 케릭터 데이터 캐시여부 체크, 캐시되지 않았을 경우 새로 가져옴
  let cachedData = nodeCache.get('characterSkins')
  if (cachedData) {
    res.status(200).json(cachedData)
  } else {
    const data = await getCharacterSkins()
    nodeCache.set('characterSkins', data)
    res.status(200).json(data)
  }
}
