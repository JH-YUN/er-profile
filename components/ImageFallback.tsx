import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

interface ImageFallbackProps extends ImageProps {
  fallbackSrc: string
}
export const ImageFallback = (props: ImageFallbackProps) => {
  const { src, fallbackSrc, ...options } = props

  const [imgSrc, setImgSrc] = useState(src)
  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <Image
      {...options}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
}
