import './App.css'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <h1>hello world!</h1>

      <Link className="link" to="/signup">
        Signup
      </Link>

      <Link className="link" to="/login">
        Login
      </Link>

      <Link className="link" to="/">
        Home
      </Link>

      <Outlet />
    </>
  )
}

export default App
