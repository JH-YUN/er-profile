import { Popover, Switch } from '@headlessui/react'
import {
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid'
import { Dispatch, useState } from 'react'

interface SettingPopoverProps {
  showWinRate: boolean
  showTotalGames: boolean
  showAverageRank: boolean
  showAverageKills: boolean
  showAverageHunts: boolean
  setShowWinRate: Dispatch<boolean>
  setShowTotalGames: Dispatch<boolean>
  setShowAverageRank: Dispatch<boolean>
  setShowAverageKills: Dispatch<boolean>
  setShowAverageHunts: Dispatch<boolean>
}

export const SettingPopover = ({
  showWinRate,
  showTotalGames,
  showAverageRank,
  showAverageKills,
  showAverageHunts,
  setShowWinRate,
  setShowTotalGames,
  setShowAverageRank,
  setShowAverageKills,
  setShowAverageHunts,
}: SettingPopoverProps) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button>
            <div className="flex items-center">
              <Cog6ToothIcon className="w-8 h-8" />
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  h-5 w-5 text-slate-100 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </div>
          </Popover.Button>
          <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
            <div className="relative grid grid-cols-1 gap-4 bg-zinc-800 p-5 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="flex justify-between gap-3">
                <span>승률 표시</span>
                <Switch
                  checked={showWinRate}
                  onChange={setShowWinRate}
                  className={`${showWinRate ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[24px] w-[45px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      showWinRate ? 'translate-x-[22px]' : 'translate-x-0'
                    }
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
              <div className="flex justify-between gap-3">
                <span>게임 수 표시</span>
                <Switch
                  checked={showTotalGames}
                  onChange={setShowTotalGames}
                  className={`${showTotalGames ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[24px] w-[45px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      showTotalGames ? 'translate-x-[22px]' : 'translate-x-0'
                    }
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
              <div className="flex justify-between gap-3">
                <span>평균 순위 표시</span>
                <Switch
                  checked={showAverageRank}
                  onChange={setShowAverageRank}
                  className={`${showAverageRank ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[24px] w-[45px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      showAverageRank ? 'translate-x-[22px]' : 'translate-x-0'
                    }
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
              <div className="flex justify-between gap-3">
                <span>평균 킬 표시</span>
                <Switch
                  checked={showAverageKills}
                  onChange={setShowAverageKills}
                  className={`${
                    showAverageKills ? 'bg-teal-900' : 'bg-teal-700'
                  }
          relative inline-flex h-[24px] w-[45px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      showAverageKills ? 'translate-x-[22px]' : 'translate-x-0'
                    }
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
              <div className="flex justify-between gap-3">
                <span>평균 사냥 표시</span>
                <Switch
                  checked={showAverageHunts}
                  onChange={setShowAverageHunts}
                  className={`${
                    showAverageHunts ? 'bg-teal-900' : 'bg-teal-700'
                  }
          relative inline-flex h-[24px] w-[45px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      showAverageHunts ? 'translate-x-[22px]' : 'translate-x-0'
                    }
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}
