import { useEffect, useState } from 'react'

function App() {
  const AMOUNT_OF_SQUARES = 500
  const ROW_LENGTH = 30
  const [cursorPosition, setCursorPosition] = useState<{
    x: number
    y: number
  }>({ x: 4, y: 5 })
  const activeIndex = cursorPosition.x * ROW_LENGTH + cursorPosition.y

  const moveUp = () =>
    setCursorPosition(prevState => ({ ...prevState, x: prevState.x - 1 }))
  const moveDown = () =>
    setCursorPosition(prevState => ({ ...prevState, x: prevState.x + 1 }))
  const moveLeft = () =>
    setCursorPosition(prevState => ({ ...prevState, y: prevState.y - 1 }))
  const moveRight = () =>
    setCursorPosition(prevState => ({ ...prevState, y: prevState.y + 1 }))

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
    <div className='flex justify-center pt- w-screen h-screen'>
      <div className='w-3/4 lg:w-2/3 2xl:1/3 mockup-window border bg-base-300 shadow-lg '>
        <div className='flex justify-center px-4 py-6 bg-base-200'>
          <div className={`grid grid-cols-30 gap-1`}>
            {[...Array(AMOUNT_OF_SQUARES)].map((_, i) => (
              <Square key={i} active={activeIndex === i} />
            ))}
          </div>
        </div>
        <div className='flex justify-center gap-1 pt-2'>
          <kbd className='kbd'>H</kbd>
          <kbd className='kbd'>J</kbd>
          <kbd className='kbd'>K</kbd>
          <kbd className='kbd'>L</kbd>
        </div>
      </div>
    </div>
  )
}

const Square = ({ active }: { active: boolean }) => (
  <div className={`h-5 w-5 ${active ? 'bg-primary' : 'bg-secondary'}`}></div>
)
export default App
