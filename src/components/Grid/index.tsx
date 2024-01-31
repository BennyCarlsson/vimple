import { useCursor } from '../../hooks/useCursorPosition'
import { AMOUNT_OF_SQUARES } from '../../utils/config'
import {
  calculateCordinatesFromIndex,
  getContentFromCoordinates,
} from '../../utils/utils'
import { Square } from '../Square'

export const Grid = () => {
  const { activeIndex, cursorState } = useCursor()

  return (
    <div className={`grid grid-cols-30 gap-1`}>
      {[...Array(AMOUNT_OF_SQUARES)].map((_, i) => (
        <Square key={i} active={activeIndex === i}>
          {getContentFromCoordinates(calculateCordinatesFromIndex(i))}
        </Square>
      ))}
      <p>{cursorState}</p>
    </div>
  )
}
