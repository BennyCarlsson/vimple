import { memo } from 'react'

interface SquareProps {
  active: boolean
  children: string
}

export const Square = memo(({ active, children }: SquareProps) => {
  return (
    <div
      className={`h-5 w-5 grid place-content-center text-white underline underline-offset-2 ${
        active ? 'bg-primary' : 'bg-secondary'
      }`}
    >
      {children}
    </div>
  )
})
