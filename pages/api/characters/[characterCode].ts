import type { NextApiRequest, NextApiResponse } from 'next'
import NodeCache from 'node-cache'

const nodeCache = new NodeCache()

// api에서 케릭터 데이터 가져옴
const getCharacters = async (): Promise<any> => {
  const config = {
    method: 'GET',
    headers: {
      'x-api-key': process.env.API_KEY,
      Accept: 'application/json',
    },
  }
  try {
    const response = await fetch(
      `${process.env.API_URL}/v1/data/Character`,
      config as RequestInit
    )

    if (!response.ok) throw response.statusText

    // 케릭터 이름 한글화
    const characters = await response.json()
    const l10nResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/l10n/Korean`
    )
    if (!l10nResponse.ok) throw l10nResponse.statusText
    const l10nData = await l10nResponse.json()

    return characters.data.map((el: { code: any }) => {
      return { ...el, name: l10nData[`Character/Name/${el.code}`] }
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
  const {
    query: { characterCode },
  } = req

  // 케릭터 데이터 캐시여부 체크, 캐시되지 않았을 경우 새로 가져옴
  let chachedCharacters: any[] | undefined = nodeCache.get('characters')
  if (chachedCharacters) {
    console.log('캐시된 캐릭터정보 사용')
    res
      .status(200)
      .json(
        chachedCharacters.find(
          (character) => character.code === Number(characterCode)
        )
      )
  } else {
    const data = await getCharacters()

    nodeCache.set('characters', data)
    res
      .status(200)
      .json(
        data.find(
          (character: { code: any }) => character.code === Number(characterCode)
        )
      )
  }
}
