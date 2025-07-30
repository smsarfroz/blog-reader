import { useContext } from "react";
import { blogContext } from "../../blogContext.js";

const Home = () => {
    const { posts } = useContext(blogContext);
    return (
        <div>
            <h1>Home page</h1>
            {
                posts.map(post => {
                    return (
                        <div className="post">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <p>{post.author.name}</p>
                            <p>Created: {post.createdAt}</p>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Home; 