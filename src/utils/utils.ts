import { CursorState } from '../hooks/useCursorPosition'
import { CONTENT, ROW_LENGTH } from './config'

export const calculateStringCordinatesFromIndex = (i: number) => {
  return `x${Math.floor(i / ROW_LENGTH)}y${Math.round(i % ROW_LENGTH)}`
}

export const calculateCordinatesFromIndex = (index: number) => {
  return {
    x: Math.floor(index / ROW_LENGTH),
    y: Math.round(index % ROW_LENGTH),
  }
}

export type coordinates = { x: number; y: number }

export const getContentFromCoordinates = (coordinates: coordinates) => {
  return CONTENT[`x${coordinates.x}y${coordinates.y}`]
}

export const shouldResetFindStatus = (
  char: string,
  cursorState: CursorState
) => {
  const keysNotResettingFind = [
    'CapsLock',
    'Shift',
    'Control',
    'Escape',
    'Alt',
    'Meta',
  ]
  return (
    !keysNotResettingFind.includes(char) &&
    (cursorState === 'find' || cursorState === 'FIND')
  )
}

const iskeyword_array = [
  '~',
  '!',
  '@',
  '#',
  '$',
  '%',
  '*',
  '&',
  '*',
  '(',
  ')',
  '-',
  '=',
  '+',
  '}',
  ']',
  ';',
  '"',
  '\\',
  ',',
  '<',
  '.',
  '>',
  '/',
]
export const iskeyword = (char: string) => iskeyword_array.includes(char)
