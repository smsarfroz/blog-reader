import styles from './Blog_preview.module.css';

function Blog_preview({post}) {

    return (
        <div>
            {
                post.published ? 

                    <div className={styles.post}>
                        <h2 className={styles.postTitle}>{post.title}</h2>
                        <div className={styles.postContent}>{post.content}</div>
                        <div className={styles.postDetail}>
                            <p>By: {post.author.username}</p>
                            <p>Created: {post.createdAt}</p>
                        </div>
                    </div>
                : null
            }
        </div>
    )
}
export default Blog_preview;
