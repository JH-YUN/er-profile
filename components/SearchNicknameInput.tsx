'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchNicknameInput() {
  const [nickname, setNickname] = useState('')
  const router = useRouter()
  const nicknameOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  }
  const searchNickname = () => {
    const trimedNickname = nickname.trim()

    if (trimedNickname !== '') {
      router.push(`/users/${trimedNickname}`)
    }
  }
  const nicknameOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchNickname()
    }
  }
  return (
    <div className="flex basis-[600px] mx-10">
      <input
        type="text"
        className="w-full border border-slate-300 py-3 pl-5 shadow-sm focus:outline-none focus:border-sky-500"
        placeholder="생존자 닉네임"
        onChange={nicknameOnchange}
        onKeyUp={nicknameOnKeyUp}
        required
      />
      <button
        className="bg-sky-600 basis-20 text-white font-semibold"
        onClick={() => searchNickname()}
      >
        검색
      </button>
    </div>
  )
}
