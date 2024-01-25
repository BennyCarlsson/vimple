import { useEffect, useState } from 'react'

export const useKeysDown = () => {
  const [keysDown, setKeysDown] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysDown(prevState => {
        prevState.delete(e.key)
        return new Set(prevState)
      })
    }
    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) {
        return
      }
      setKeysDown(prevState => new Set([...prevState, e.key]))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const isKeyDown = (key: string) => {
    return keysDown.has(key)
  }
  return { isKeyDown }
}
