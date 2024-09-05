import 'react-day-picker/style.css'
import './App.css'
import Calendar from './components/Calendar'

function App() {

  return (
    <div className='h-screen w-screen background-color: bg-pink-100 flex items-center justify-center'>
      <div className='bg-white min-height: 500px; shadow rounded p-5'>
          <Calendar />
      </div>
    </div>
  )
}

export default App
