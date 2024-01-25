import { useKeysDown } from '../../hooks/useKeysDown'

export const KBDS = () => {
  const { isKeyDown } = useKeysDown()

  // Todo lowercase and uppercase
  // Todo Make clickable and mobile friendly
  return (
    <div className='flex justify-center gap-1 pt-2'>
      <kbd className={`kbd ${isKeyDown('h') ? 'bg-base-300' : ''}`}>H</kbd>
      <kbd className={`kbd ${isKeyDown('j') ? 'bg-base-300' : ''}`}>J</kbd>
      <kbd className={`kbd ${isKeyDown('k') ? 'bg-base-300' : ''}`}>K</kbd>
      <kbd className={`kbd ${isKeyDown('l') ? 'bg-base-300' : ''}`}>L</kbd>
    </div>
  )
}
