import React, { Suspense } from 'react'
import Ranking from '@/components/Ranking'
import SearchNicknameInput from '@/components/SearchNicknameInput'
import RankingSkeleton from '@/components/skeleton/RankingSkeleton'

export default function Page() {
  return (
    <>
      <div className="flex justify-center mt-52">
        <h1 className="text-[40px] font-bold text-white">ER-PROFILE</h1>
      </div>
      <div className="flex justify-center mb-10">
        <h2 className="text-xl">이터널리턴 전적검색</h2>
      </div>
      <div className="flex justify-center text-lg">
        <SearchNicknameInput />
      </div>
      <div className="flex mx-10 justify-center mt-4 mb-3">
        <div className="mt-3 w-full basis-[600px]">
          <Suspense fallback={<RankingSkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <Ranking gameMode="squard" count={10} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
