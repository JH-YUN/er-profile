import type { NextApiRequest, NextApiResponse } from 'next'
import NodeCache from 'node-cache'

const nodeCache = new NodeCache()

// 언어데이터 가져오기
const getL10n = async (language: string) => {
  const config = {
    method: 'GET',
    headers: {
      'x-api-key': process.env.API_KEY,
      Accept: 'application/json',
    },
  }
  try {
    const response = await fetch(
      `${process.env.API_URL}/v1/l10n/${language}`,
      config as RequestInit
    )

    if (!response.ok) throw response.statusText
    const l18nUrl = (await response.json()).data.l10Path
    const l18nData = await (await fetch(l18nUrl)).text()

    let l18nObject: any = {}

    // l18n 데이터 파싱
    l18nData.split('\r\n').forEach((el) => {
      const [key, value] = el.split('┃')
      l18nObject[key] = value
    })
    return l18nObject
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
    query: { language },
  } = req
  // 케릭터 데이터 캐시여부 체크, 캐시되지 않았을 경우 새로 가져옴
  let chachedL10n = nodeCache.get('l10n')
  if (chachedL10n) {
    res.status(200).json(chachedL10n)
  } else {
    const data = await getL10n(language as string)
    nodeCache.set('l10n', data)
    res.status(200).json(data)
  }
}
