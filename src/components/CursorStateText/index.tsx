import { useCursor } from '../../hooks/useCursorPosition'

export const CursorStateText = () => {
  const { cursorState } = useCursor()
  return <p>{cursorState}</p>
}
