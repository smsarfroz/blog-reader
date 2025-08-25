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

    let params = useParams();
    let postid = params.id;
    let id = parseInt(postid);
    useEffect(() => {

        const fetchData = async() => {
            try {
                const [postResponse, commentsResponse] = await Promise.all([
                    fetch(`/posts/${id}`, { mode: "cors" }),
                    fetch(`/posts/${id}/comments`, { mode: "cors" })
                ]);

                if (!postResponse.ok) {
                    throw new Error("Failed to fetch post");
                }

                if (!commentsResponse.ok) {
                    console.warn("Failed to fetch comments, using empty array");
                }

                const responseText = await postResponse.text();
                const jsonPostData = await JSON.parse(responseText);
                // const postData = await postResponse.json();
                const commentsData = await commentsResponse.json();

                setPost(jsonPostData);
                setComments(commentsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        
    }, []);

    return {post, comments, setComments, error, loading};
};

function Blog() {
    const { loggedIn, authorId } = useContext(blogContext);
    // const receivedData = useLocation().state;
    // const { post } = receivedData;
    const {post, comments, setComments, error, loading} = useComments();
    const [inputComment, setInputComment] = useState("");
    

    let params = useParams();
    let postid = params.id;
    let id = parseInt(postid);
    // console.log(comments, error, loading);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>A network error was encountered: {error}</p>;
    if (!post) return <p>Post not found.</p>

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

