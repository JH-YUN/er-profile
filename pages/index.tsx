import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Ranking } from '../components/Ranking'

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
      <div className="flex flex-col items-center mx-10 xl:flex-row mt-4">
        <div className="mt-3 max-w-[600px] w-full xl:basis-[600px] xl:mx-3">
          <Ranking gameMode="solo" count={5} />
        </div>
        <div className="mt-3 max-w-[600px] w-full xl:basis-[600px] xl:mx-3">
          <Ranking gameMode="duo" count={5} />
        </div>
        <div className="mt-3 max-w-[600px] w-full xl:basis-[600px] xl:mx-3">
          <Ranking gameMode="squard" count={5} />
        </div>
      </div>
    </>
  )
}

export default Home
