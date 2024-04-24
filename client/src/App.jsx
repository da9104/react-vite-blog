import './App.css'
import Login from './pages/Login'
import MainImg from './assets/ryan-cuerden-lbsa7Nn5EPI-unsplash.jpg'


function App() { // main landing page
  return (
    <>
    <div className='grid grid-cols-2 place-content-center'>
      <div className="">    
      <Login /> 
      </div>
      <div className="h-screen">
        <img className="h-full max-h-screen w-full" src={MainImg} /> 
      </div>
    </div>
    </>
  )
}

export default App
