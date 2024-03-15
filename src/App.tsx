import { KBDS } from './components/KBDS'
import { Grid } from './components/Grid'
import { CursorStateText } from './components/CursorStateText'

function App() {
  return (
    <div className='flex justify-center pt- w-screen h-screen'>
      <div className='w-3/4 lg:w-2/3 2xl:1/3 mockup-window border bg-base-300 shadow-lg '>
        <div className='flex justify-center px-4 py-6 bg-base-200'>
          <Grid />
        </div>
        <CursorStateText />
        <KBDS />
      </div>
    </div>
  )
}

export default App
