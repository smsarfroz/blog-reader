import './App.css'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { blogContext } from './blogContext.js';

const usePosts = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/posts", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setPosts(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);
  return { posts, error, loading };
};

function App() {
  const { posts, error, loading } = usePosts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  
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

      <div className="commonBackground">
        <blogContext.Provider value={{posts}}>
          <Outlet />
        </blogContext.Provider>
      </div>
    </>
  )
}

export default App;

