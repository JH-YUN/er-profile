import { ReactNode } from 'react'

interface TooltipProps {
  message: string | ReactNode
  children: ReactNode
}
export const Tooltip = ({ message, children }: TooltipProps) => {
  return (
    <div className="group relative w-fit h-fit">
      {children}
      <div className="absolute hidden z-50  bg-zinc-800/90 text-white m-2 p-3 w-[300px] text-sm left-0 group-hover:block group-active:block">
        {message}
      </div>
    </div>
  )
}
