import { useEffect, useState } from 'react'

export const Grid = () => {
  const AMOUNT_OF_SQUARES = 510
  const ROW_LENGTH = 30

  const [cursorPosition, setCursorPosition] = useState<{
    x: number
    y: number
  }>({ x: 4, y: 5 })
  const activeIndex = cursorPosition.x * ROW_LENGTH + cursorPosition.y

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

  useEffect(() => {
    window.addEventListener('keypress', handleUserKeyPress)

    return () => {
      window.removeEventListener('keypress', handleUserKeyPress)
    }
  })

  return (
    <div className={`grid grid-cols-30 gap-1`}>
      {[...Array(AMOUNT_OF_SQUARES)].map((_, i) => (
        <Square key={i} active={activeIndex === i} />
      ))}
    </div>
  )
}

const Square = ({ active }: { active: boolean }) => (
  <div className={`h-5 w-5 ${active ? 'bg-primary' : 'bg-secondary'}`}></div>
)
