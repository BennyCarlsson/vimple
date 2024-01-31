import { useEffect, useState } from 'react'
import { ROW_LENGTH } from '../utils/config'
import {
  appendAtEndOfLine,
  findChar,
  findCharBack,
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
import { shouldResetFindStatus } from '../utils/utils'

export type CursorPosition = { x: number; y: number }
export type CursorState = 'normal' | 'find' | 'FIND'

export const useCursor = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 5,
    y: 1,
  })
  const [cursorState, setCursorState] = useState<CursorState>('normal')
  const activeIndex = cursorPosition.x * ROW_LENGTH + cursorPosition.y

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setCursorState('normal')
    }

    if (e.shiftKey) {
      if (e.key === 'A' || e.key === 'a') {
        setCursorPosition(prevState => appendAtEndOfLine(prevState))
      }
      if (e.key === 'I' || e.key === 'i') {
        setCursorPosition(prevState => insertAtBeginningOfLine(prevState))
      }
    }
    if (e.key === 'F') {
      setCursorState('FIND')
    } else if (e.key === 'f') {
      setCursorState('find')
    } else if (cursorState === 'find' && e.key) {
      setCursorPosition(prevState => findChar(prevState, e.key))
    } else if (cursorState === 'FIND' && e.key) {
      setCursorPosition(prevState => findCharBack(prevState, e.key))
    } else {
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

    if (shouldResetFindStatus(e.key, cursorState)) {
      setCursorState('normal')
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  return { activeIndex, cursorState }
}
