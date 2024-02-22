'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface TooltipProps {
  message: string | ReactNode
  children: ReactNode
}
export const Tooltip = ({ message, children }: TooltipProps) => {
  const tooltipTriggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [isShowTooltip, setIsShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState<
    ['left' | 'right', 'top' | 'bottom']
  >(['right', 'bottom'])
  const [tooltipPositionStyle, setTooltipPositionStyle] = useState<any>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })
  const tooltipWidth = 200

  useEffect(() => {
    if (tooltipTriggerRef.current) {
      const { top, left } = tooltipTriggerRef.current.getBoundingClientRect()

      if (top > window.innerHeight / 2) {
        setTooltipPosition((prev) => [prev[0], 'top'])
        setTooltipPositionStyle({
          bottom: tooltipTriggerRef.current?.offsetHeight!,
        })
      } else {
        setTooltipPosition((prev) => [prev[0], 'bottom'])
        setTooltipPositionStyle({
          top: tooltipTriggerRef.current?.offsetHeight!,
        })
      }

      if (left + tooltipWidth > window.innerWidth) {
        setTooltipPosition((prev) => ['left', prev[1]])
      } else {
        setTooltipPosition((prev) => ['right', prev[1]])
      }
    }
  }, [isShowTooltip])

  const handleMouseEnter = () => {
    setIsShowTooltip(true)
  }
  const handleMouseLeave = () => {
    setIsShowTooltip(false)
  }

  const tooltipWidthClass = `w-[${tooltipWidth}px]`

  return (
    <div
      ref={tooltipTriggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-fit h-fit"
    >
      {children}
      {isShowTooltip && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 bg-zinc-800/90 text-white m-2 p-3 text-sm box-border
          ${tooltipWidthClass}
        `}
          style={tooltipPositionStyle}
        >
          {message}
        </div>
      )}
    </div>
  )
}
