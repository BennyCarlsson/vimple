import { useCursorPosition } from '../../hooks/useCursorPosition'
import { AMOUNT_OF_SQUARES, CONTENT, ROW_LENGTH } from '../../utils/config'
import { Square } from '../Square'

export const Grid = () => {
  const { activeIndex } = useCursorPosition()

  const calculateCordinates = (i: number) => {
    return `x${Math.floor(i / ROW_LENGTH)}y${Math.round(i % ROW_LENGTH)}`
  }

  return (
    <div className={`grid grid-cols-30 gap-1`}>
      {[...Array(AMOUNT_OF_SQUARES)].map((_, i) => (
        <Square key={i} active={activeIndex === i}>
          {CONTENT[calculateCordinates(i)]}
        </Square>
      ))}
    </div>
  )
}
