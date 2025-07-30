import './App.css'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';

const blogContext = createContext({
  posts: [],
});

function App() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setPosts(result);
      } catch (err) {
        console.error(err.mesage);
      } 
    };
    
    fetchData();
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

