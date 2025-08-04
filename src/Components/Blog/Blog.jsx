import { useLocation } from "react-router-dom";
import styles from './Blog.module.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Comment from "../Comment/Comment.jsx";

const useComments = () => {
    const [comments, setComments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    let params = useParams();
    let postid = params.id;
    let id = parseInt(postid);
    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}/comments`, { mode: "cors" })
        .then((response) => {
        if (response.status >= 400) {
            throw new Error("server error");
        }
        return response.json();
        })
        .then((response) => setComments(response))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, []);
    return {comments, error, loading};
};

function Blog() {
    
    const receivedData = useLocation().state;
    const { post } = receivedData;
    const {comments, error, loading} = useComments();
    // console.log(comments, error, loading);
    if (loading) {
        return <p>Loading...</p>;
    } else if (error) {
        return <p>A network error was encountered</p>;
    }
    return (
        <div className={styles.blog}>
            <div className={styles.container}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.content}>{post.content}</p>
            </div>
            <hr />
            <div className={styles.inputContainer}>
                <form>
                    <textarea name="" id="commentContainer" className={styles.commentContainer} placeholder="Add a comment..." required></textarea>
                    <button className={styles.postButton}>Post</button>
                </form>
            </div>

            <div className={styles.comments}>
                {
                    comments.map((comment) => {
                        return (
                            <Comment
                                comment={comment}
                                key={uuidv4()}
                            />
                        );
                    })
                }
            </div>        
        </div>
    );
}
export default Blog;

