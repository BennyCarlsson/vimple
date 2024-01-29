import { CursorPosition } from '../hooks/useCursorPosition'
import { AMOUNT_OF_SQUARES, CONTENT, ROW_LENGTH } from '../utils/config'
import { getContentFromCoordinates } from '../utils/utils'

export const appendAtEndOfLine = (cursorPosition: CursorPosition) => {
  let n = ROW_LENGTH - 1
  while (n >= 0 && n >= cursorPosition.y) {
    if (CONTENT[`x${cursorPosition.x}y${n}`]) {
      return { x: cursorPosition.x, y: n + 1 }
    }
    n--
  }
  return cursorPosition
}

export const insertAtBeginningOfLine = (cursorPosition: CursorPosition) => {
  let n = 0
  while (n < ROW_LENGTH - 1 && n < cursorPosition.y) {
    if (CONTENT[`x${cursorPosition.x}y${n}`]) {
      return { x: cursorPosition.x, y: n }
      break
    }
    n++
  }
  return cursorPosition
}

export const moveUp = (cursorPosition: CursorPosition) => {
  if (cursorPosition.x <= 0) {
    return cursorPosition
  }

  return { ...cursorPosition, x: cursorPosition.x - 1 }
}

export const moveDown = (cursorPosition: CursorPosition) => {
  if (cursorPosition.x >= Math.floor(AMOUNT_OF_SQUARES / ROW_LENGTH) - 1) {
    return cursorPosition
  }
  return { ...cursorPosition, x: cursorPosition.x + 1 }
}

export const moveLeft = (cursorPosition: CursorPosition) => {
  if (cursorPosition.y <= 0) {
    return cursorPosition
  }
  return { ...cursorPosition, y: cursorPosition.y - 1 }
}

export const moveRight = (cursorPosition: CursorPosition) => {
  if (cursorPosition.y >= ROW_LENGTH - 1) {
    return cursorPosition
  }
  return { ...cursorPosition, y: cursorPosition.y + 1 }
}

export const nextWord = (cursorPosition: CursorPosition) => {
  let currentY = cursorPosition.y
  let passedEmptySquare = false

  while (currentY <= ROW_LENGTH - 1) {
    const currentContent = getContentFromCoordinates({
      x: cursorPosition.x,
      y: currentY,
    })

    if (passedEmptySquare && currentContent) {
      return { x: cursorPosition.x, y: currentY }
    } else if (currentContent === undefined) {
      passedEmptySquare = true
    }

    currentY++
  }

  return cursorPosition
}
