import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

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
    <div className="flex justify-center text-lg">
      <div className="flex basis-1/3 mt-52">
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
  )
}

export default Home
