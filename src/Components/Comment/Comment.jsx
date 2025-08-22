import styles from './Comment.module.css';

function Comment({comment}) {
    console.log(comment);
    return (
        <div className={styles.comment}>
            <div className={styles.commentDetails}>
                <h3>{comment.user.username}</h3>
                <p className={styles.date}>{comment.createdAt}</p>
            </div>
            <hr />
            <p>{comment.content}</p>
        </div>
    )
}

export default Comment;