import { useLocation } from "react-router-dom";

function Blog() {
    const receivedData = useLocation().state;
    console.log(receivedData);
    const { post } = receivedData;
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <hr />
        </div>
    );
}
export default Blog;

