import { useLayoutEffect, useState } from "react"

type WindowSize = {
  width: number | null
  height: number | null
}

const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>({ width: null, height: null })

  useLayoutEffect(() => {
    const handleSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleSize()

    window.addEventListener("resize", handleSize)

    return () => {
      window.removeEventListener("resize", handleSize)
    }
  }, [])

  return size
}

export default useWindowSize
