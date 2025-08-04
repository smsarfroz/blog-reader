import styles from './Comment.module.css';

function Comment({comment}) {
    
    return (
        <div className={styles.comment}>
            <div className={styles.commentDetails}>
                <h3>{comment.user.name}</h3>
                <p className={styles.date}>{comment.createdAt}</p>
            </div>
            <hr />
            <p>{comment.content}</p>
        </div>
    )
}

export default Comment;