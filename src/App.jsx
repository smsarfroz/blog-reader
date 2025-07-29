import './App.css'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { blogContext } from './BlogContext.js';

function App() {
  const [posts, setPosts] = useState(null);
  const api = "http://localhost:3000";

  useEffect(() => {
    fetch(api, { mode: "cors" })
      .then((response) => response.json())
      .then((response) => setPosts(response))
      .catch((error) => console.error(error));
  }, []);


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

      <blogContext.Provider value={{posts}}>
        <Outlet />
      </blogContext.Provider>
    </>
  )
}

export default App;

