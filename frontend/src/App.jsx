import { Toaster } from 'react-hot-toast'
import './App.css'
import AppRoutes from './pages/router/AppRoutes'

function App() {
  return (
    <div>
      <AppRoutes />
      <Toaster position='top-right'/>
    </div>
  )
}

export default App
