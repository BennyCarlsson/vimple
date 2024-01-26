import { useEffect, useState } from 'react'
import { AMOUNT_OF_SQUARES, CONTENT, ROW_LENGTH } from '../utils/config'

export const useCursorPosition = () => {
  const [cursorPosition, setCursorPosition] = useState<{
    x: number
    y: number
  }>({ x: 5, y: 1 })

  const activeIndex = cursorPosition.x * ROW_LENGTH + cursorPosition.y

  const insertAtBeginningOfLine = () => {
    let n = 0
    while (n < ROW_LENGTH - 1 && n < cursorPosition.y) {
      if (CONTENT[`x${cursorPosition.x}y${n}`]) {
        setCursorPosition({ x: cursorPosition.x, y: n })
        break
      }
      n++
    }
  }

  const appendAtEndOfLine = () => {
    let n = ROW_LENGTH - 1
    while (n >= 0 && n >= cursorPosition.y) {
      if (CONTENT[`x${cursorPosition.x}y${n}`]) {
        setCursorPosition({ x: cursorPosition.x, y: n + 1 })
        break
      }
      n--
    }
  }

  const moveUp = () => {
    setCursorPosition(prevState => {
      if (prevState.x <= 0) {
        return prevState
      }

      return { ...prevState, x: prevState.x - 1 }
    })
  }

  const moveDown = () =>
    setCursorPosition(prevState => {
      if (prevState.x >= Math.floor(AMOUNT_OF_SQUARES / ROW_LENGTH) - 1) {
        return prevState
      }
      return { ...prevState, x: prevState.x + 1 }
    })

  const moveLeft = () =>
    setCursorPosition(prevState => {
      if (prevState.y <= 0) {
        return prevState
      }
      return { ...prevState, y: prevState.y - 1 }
    })

  const moveRight = () =>
    setCursorPosition(prevState => {
      if (prevState.y >= ROW_LENGTH - 1) {
        return prevState
      }
      return { ...prevState, y: prevState.y + 1 }
    })

  const handleUserKeyPress = (e: KeyboardEvent) => {
    if (e.shiftKey) {
      if (e.key === 'A' || e.key === 'a') {
        appendAtEndOfLine()
      }
      if (e.key === 'I' || e.key === 'i') {
        insertAtBeginningOfLine()
      }
    } else {
      if (e.key === 'k') {
        moveUp()
      }
      if (e.key === 'j') {
        moveDown()
      }
      if (e.key === 'l') {
        moveRight()
      }
      if (e.key === 'h') {
        moveLeft()
      }
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
