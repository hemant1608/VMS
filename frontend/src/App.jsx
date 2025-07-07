import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CheckInForm from './pages/CheckInForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div className='w-screen overflow-x-hidden box-border' >
    <CheckInForm />
    </div>
      
    
  )
}

export default App
