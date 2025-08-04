import { useContext } from "react";
import { blogContext } from "../../blogContext.js";
import Blog_preview from "../Blog_preview/Blog_preview.jsx";
import { v4 as uuidv4 } from 'uuid';
import styles from './Home.module.css';
import { Link } from "react-router-dom";

const Home = () => {
    const { posts } = useContext(blogContext);
    return (
        <div className={styles.homePage}>
            <h1 className={styles.homeTitle}>All Blogs</h1>

            <div className={styles.posts}>
                {
                    posts.map((post, i) => {
                        return (
                            <Link to={`/posts/${i}`} state={{post: post}} key={uuidv4()}>
                                <Blog_preview
                                    key={uuidv4()}
                                    post={post}
                                />
                            </Link> 
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Home; 
