import { useContext } from "react";
import { blogContext } from "../../blogContext.js";
import Blog_preview from "../Blog_preview/Blog_preview.jsx";
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
    const { posts } = useContext(blogContext);
    return (
        <div>
            <h1>Home page</h1>
            {
                posts.map((post) => {
                    return (
                        <Blog_preview
                            key={uuidv4()}
                            post={post}
                        />
                    )
                })
            }
        </div>
    );
};

export default Home; 