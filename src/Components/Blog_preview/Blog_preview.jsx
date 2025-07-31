import styles from './Blog_preview.module.css';

function Blog_preview({post}) {

    return (
        <div>
            <div className={styles.post}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postContent}>{post.content}</p>
                <div className={styles.postDetail}>
                    <p>By: {post.author.name}</p>
                    <p>Created: {post.createdAt}</p>
                </div>
            </div>
        </div>
    )
}
export default Blog_preview;
