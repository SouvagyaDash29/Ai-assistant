import MainPage from "./page/MainPage" 
import './App.css'
import UserContext from "./context/UserContext"

function App() {


  return (
    <div className=''>
      <UserContext>
       <MainPage />
      </UserContext>  
    </div>
  )
}

export default App
