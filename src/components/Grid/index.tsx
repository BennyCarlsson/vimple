import { ReactNode, useEffect, useState } from 'react'

export const Grid = () => {
  const CONTENT: { [key: string]: string } = {
    x5y2: 'H',
    x5y3: 'E',
    x5y4: 'L',
    x5y5: 'L',
    x5y6: 'O',
    x5y8: 'W',
    x5y9: 'O',
    x5y10: 'R',
    x5y11: 'L',
    x5y12: 'D',
  }
  const AMOUNT_OF_SQUARES = 510
  const ROW_LENGTH = 30

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

  return (
    <div className={`grid grid-cols-30 gap-1`}>
      {[...Array(AMOUNT_OF_SQUARES)].map((_, i) => (
        <Square key={i} active={activeIndex === i}>
          {
            CONTENT[
              `x${Math.floor(i / ROW_LENGTH)}y${Math.round(i % ROW_LENGTH)}`
            ]
          }
        </Square>
      ))}
    </div>
  )
}

const Square = ({
  active,
  children,
}: {
  active: boolean
  children: ReactNode
}) => (
  <div
    className={`h-5 w-5 grid place-content-center text-white underline underline-offset-2 ${
      active ? 'bg-primary' : 'bg-secondary'
    }`}
  >
    {children}
  </div>
)
