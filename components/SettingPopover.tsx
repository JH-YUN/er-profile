import { Popover, Switch } from '@headlessui/react'
import {
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid'
import { Dispatch, SetStateAction, useState } from 'react'

export const SettingPopover = ({
  showMode,
  showWinRate,
  showTotalGames,
  showAverageRank,
  showAverageKills,
  showAverageHunts,
  setShowMode,
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
              <div
                className="inline-flex rounded-md shadow-sm justify-center"
                role="group"
              >
                <button
                  type="button"
                  onClick={() => {
                    showMode.includes(1)
                      ? setShowMode([...showMode.filter((mode) => mode !== 1)])
                      : setShowMode([1, ...showMode])
                  }}
                  className={
                    'py-2 px-4 text-sm font-medium text-gray-300 rounded-l-lg border border-gray-900 hover:bg-teal-700 hover:text-white ' +
                    (showMode.includes(1) ? ' bg-teal-900' : 'bg-translate')
                  }
                >
                  Solo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showMode.includes(2)
                      ? setShowMode([...showMode.filter((mode) => mode !== 2)])
                      : setShowMode([2, ...showMode])
                  }}
                  className={
                    'py-2 px-4 text-sm font-medium text-gray-300 border-t border-b border-gray-900 hover:bg-teal-700 hover:text-white ' +
                    (showMode.includes(2) ? ' bg-teal-900' : 'bg-translate')
                  }
                >
                  Duo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showMode.includes(3)
                      ? setShowMode([...showMode.filter((mode) => mode !== 3)])
                      : setShowMode([3, ...showMode])
                  }}
                  className={
                    'py-2 px-4 text-sm font-medium text-gray-300 rounded-r-md border border-gray-900 hover:bg-teal-700 hover:text-white ' +
                    (showMode.includes(3) ? ' bg-teal-900' : 'bg-translate')
                  }
                >
                  Squard
                </button>
              </div>

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
