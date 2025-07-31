import { useLocation } from "react-router-dom";
import styles from './Blog.module.css';

function Blog() {
    const receivedData = useLocation().state;
    const { post } = receivedData;
    return (
        <div className={styles.blog}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <hr />
        </div>
    );
}
export default Blog;
