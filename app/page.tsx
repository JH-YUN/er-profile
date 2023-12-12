'use client'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import React, { Suspense, useState } from 'react'
import { Ranking, RankingSkeleton } from '../components/Ranking'

const Home: NextPage = () => {
  const [nickname, setNickname] = useState('')
  const router = useRouter()
  const nicknameOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  }
  const searchNickname = () => {
    if (nickname === '') {
      console.log('생존자의 닉네임을 입력해주세요')
    } else {
      router.push(`/users/${nickname}`)
    }
  }
  const nicknameOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchNickname()
    }
  }
  return (
    <>
      <div className="flex justify-center mt-52">
        <h1 className="text-[40px] font-bold text-white">ER-PROFILE</h1>
      </div>
      <div className="flex justify-center mb-10">
        <h2 className="text-xl">이터널리턴 전적검색</h2>
      </div>
      <div className="flex justify-center text-lg">
        <div className="flex basis-[600px] mx-10">
          <input
            type="text"
            className="w-full border border-slate-300 py-3 pl-5 shadow-sm focus:outline-none focus:border-sky-500"
            placeholder="생존자 닉네임"
            onChange={nicknameOnchange}
            onKeyUp={nicknameOnKeyUp}
          />
          <button
            className="bg-sky-600 basis-20 text-white font-semibold"
            onClick={() => searchNickname()}
          >
            검색
          </button>
        </div>
      </div>
      <div className="flex mx-10 justify-center mt-4 mb-3">
        <div className="mt-3 w-full basis-[600px]">
          <Suspense fallback={<RankingSkeleton />}>
            <Ranking gameMode="squard" count={10} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Home
