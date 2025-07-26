import './App.css'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <nav>
        <b className="Title">Sarfroz's Blog</b>
        <div className="pages">
          <span>
            <Link to="/" className="link">
              Home
            </Link>
          </span>
          <span><a href="https://github.com/smsarfroz/Blog-API">github</a></span>
        </div>
        <div className="userState">
          <span>
            <Link to="/signup" className="link">
              Sign up
            </Link>
          </span>
          <span>
            <Link to="/login" className="link">
              Login
            </Link>
          </span>
        </div>
      </nav>

      <Outlet />
    </>
  )
}

export default App;

