import { useEffect, useState } from 'react'
import { ROW_LENGTH } from '../utils/config'
import {
  appendAtEndOfLine,
  insertAtBeginningOfLine,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  nextWORD,
  nextWord,
  previousWORD,
  previousWord,
} from '../utils/moveCursor'

export type CursorPosition = { x: number; y: number }
export const useCursor = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 5,
    y: 1,
  })

  const activeIndex = cursorPosition.x * ROW_LENGTH + cursorPosition.y
  const handleUserKeyPress = (e: KeyboardEvent) => {
    if (e.shiftKey) {
      if (e.key === 'A' || e.key === 'a') {
        setCursorPosition(prevState => appendAtEndOfLine(prevState))
      }
      if (e.key === 'I' || e.key === 'i') {
        setCursorPosition(prevState => insertAtBeginningOfLine(prevState))
      }
    }
    if (e.key === 'k') {
      setCursorPosition(prevState => moveUp(prevState))
    }
    if (e.key === 'j') {
      setCursorPosition(prevState => moveDown(prevState))
    }
    if (e.key === 'l') {
      setCursorPosition(prevState => moveRight(prevState))
    }
    if (e.key === 'h') {
      setCursorPosition(prevState => moveLeft(prevState))
    }
    if (e.key === 'w') {
      setCursorPosition(prevState => nextWord(prevState))
    }
    if (e.key === 'W') {
      setCursorPosition(prevState => nextWORD(prevState))
    }
    if (e.key === 'b') {
      setCursorPosition(prevState => previousWord(prevState))
    }
    if (e.key === 'B') {
      setCursorPosition(prevState => previousWORD(prevState))
    }
  }

  useEffect(() => {
    window.addEventListener('keypress', handleUserKeyPress)

    return () => {
      window.removeEventListener('keypress', handleUserKeyPress)
    }
  })

  return { activeIndex }
}
