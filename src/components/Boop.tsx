import { useState, useEffect } from "react"
import CSS from "csstype"

interface Options {
  rotation?: number
  timing?: number
  children: React.ReactNode
}

export const Boop = ({ rotation = 0, timing = 150, children }: Options) => {
  const [isBooped, setIsBooped] = useState<Boolean>(false)

  const style: CSS.Properties = {
    display: "inline-block",
    transform: isBooped ? `rotate(${rotation}deg)` : `rotate(0deg)`,
    transition: `transform ${timing}ms`,
  }

  useEffect(() => {
    if (!isBooped) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setIsBooped(false)
    }, timing)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isBooped, timing])

  const trigger = () => {
    setIsBooped(true)
  }

  return (
    <span onMouseEnter={trigger} style={style}>
      {children}
    </span>
  )
}
