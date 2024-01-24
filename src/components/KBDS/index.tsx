import { useEffect, useState } from 'react'

export const KBDS = () => {
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

  // Todo lowercase and uppercase
  return (
    <div className='flex justify-center gap-1 pt-2'>
      <kbd className={`kbd ${keysDown.has('h') ? 'bg-base-300' : ''}`}>H</kbd>
      <kbd className={`kbd ${keysDown.has('j') ? 'bg-base-300' : ''}`}>J</kbd>
      <kbd className={`kbd ${keysDown.has('k') ? 'bg-base-300' : ''}`}>K</kbd>
      <kbd className={`kbd ${keysDown.has('l') ? 'bg-base-300' : ''}`}>
        L
      </kbd>{' '}
    </div>
  )
}
