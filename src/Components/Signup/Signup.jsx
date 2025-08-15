import styles from './Signup.module.css';
import { useContext, useEffect } from 'react';
import { blogContext } from '../../blogContext';

const Signup = () => {
    const { authorId, setAuthorId } = useContext(blogContext);

    useEffect(() => {
        localStorage.setItem('authorId', JSON.stringify(authorId));
    }, [authorId]);

    function handleAuthorIdChange(id) {
        setAuthorId(id);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        let data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // console.log(data);

        fetch("http://localhost:3000/signup", {
            mode: 'cors',
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((user) => {
            handleAuthorIdChange(user.id);
            console.log('user created successfully:');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        })
    }
    return (
        <div>
            <h1>signup page</h1>

            <form action="/signup" method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username"/>
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="text" name="password" id="password"/>
                </div>

                <button type="submit" className={styles.signup}>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;