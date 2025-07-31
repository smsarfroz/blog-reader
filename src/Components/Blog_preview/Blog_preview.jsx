function Blog_preview({post}) {

    return (
        <div>
            <div className="post">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>{post.author.name}</p>
                <p>Created: {post.createdAt}</p>
            </div>
        </div>
    )
}
export default Blog_preview;