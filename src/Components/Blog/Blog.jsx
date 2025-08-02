import { useLocation } from "react-router-dom";
import styles from './Blog.module.css';

function Blog() {
    const receivedData = useLocation().state;
    const { post } = receivedData;
    return (
        <div className={styles.blog}>
            <div className={styles.container}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.content}>{post.content}</p>
            </div>
            <hr />
            <div className={styles.inputContainer}>
                <form>
                    <textarea name="" id="commentContainer" className={styles.commentContainer} placeholder="Add a comment..."></textarea>
                </form>
            </div>
        </div>
    );
}
export default Blog;
