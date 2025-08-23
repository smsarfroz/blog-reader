import { Link, Links, useLocation } from "react-router-dom";
import styles from './Blog.module.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Comment from "../Comment/Comment.jsx";
import { useContext } from "react";
import { blogContext } from "../../blogContext.js";

const useComments = () => {
    const [comments, setComments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);

    const [error2, setError2] = useState(null);
    const [loading2, setLoading2] = useState(true);

    let params = useParams();
    let postid = params.id;
    let id = parseInt(postid);
    console.log("here1");
    useEffect(() => {
        fetch(`/posts/${id}/comments`, { mode: "cors" })
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

    console.log("comments: ", comments);
    console.log("here2");

    useEffect(() => {
        fetch(`/posts/${id}`, { mode: "cors" })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("1 response: ", response);
            return response.json();
        })
        .then((response) => {
            console.log("response: ", response);
            setPost(response)
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            setError2(error);
        })
        .finally(() => {
            setLoading2(false);
        })
    }, []);

    return {post, error2, loading2, comments, setComments, error, loading};
};

function Blog() {
    const { loggedIn, authorId } = useContext(blogContext);
    // const receivedData = useLocation().state;
    // const { post } = receivedData;
    const {post, error2, loading2, comments, setComments, error, loading} = useComments();
    const [inputComment, setInputComment] = useState("");
    

    let params = useParams();
    let postid = params.id;
    let id = parseInt(postid);
    // console.log(comments, error, loading);
    if (loading || loading2) return <p>Loading...</p>;
    if (error || error2) return <p>A network error was encountered</p>;

    console.log('post: ', post);
    console.log("comments: ", comments);

    function handleComment(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        let data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        // console.log('data: ', data);
        // console.log('id: ', id);
        setInputComment("");
        const token = localStorage.getItem('token');

        fetch((`/posts/${id}/comment`), {
            mode: 'cors',
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // console.log('response, typeof ', response, typeof response);
            return response.json();
        })
        .then((response) => {
            // console.log('response: ', response.clone());
            setComments(prevComments => [...prevComments, response]);
            // console.log('response: ', response);
            console.log('comment added successfully.');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        })
    }
    function handleInputChange(e) {
        setInputComment(e.target.value);
    }


    if (loading) {
        return <p>Loading...</p>;
    } else if (error) {
        return <p>A network error was encountered</p>;
    }
    return (
        <div className={styles.blog}>
            <div className={styles.container}>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.content}>{post.content}</div>
            </div>
            

            {
                loggedIn ? (
                    <>
                        <hr />
                        <div className={styles.inputContainer}>
                            <form onSubmit={handleComment}>
                                <input type="hidden" name="userId" value={authorId} />
                                <input type="hidden" name="postId" value={id}/>

                                <textarea name="content" id="commentContainer" className={styles.commentContainer} value={inputComment} onChange={handleInputChange} placeholder="Add a comment..." required></textarea>
                                
                                
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
                    </>
                ) : (
                    <>
                        <p className={styles.logintoComment}><Link to='/login' className={styles.login}>Log In</Link> to comment</p>
                    </>
                )
            }
        </div>
    );
}
export default Blog;

