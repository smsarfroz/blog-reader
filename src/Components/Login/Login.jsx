import styles from './Login.module.css';
import { blogContext } from '../../blogContext';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const { loggedIn, setLoggedIn } = useContext(blogContext);

    useEffect(() => {
        localStorage.setItem('loggedIn', JSON.stringify(loggedIn));

        if (loggedIn === false) {
            localStorage.removeItem('token');
        }

    }, [loggedIn]);

    function handleLogin(token) {
        setLoggedIn(true);
        localStorage.setItem('token', JSON.stringify(token));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        let data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // console.log(data);

        fetch("http://localhost:3000/login", {
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
        .then((response) => {
            console.log('user logged in successfully:');
            // console.log('response: ', response);
            handleLogin(response.token);
            console.log('loggedIn: ', loggedIn);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        })
    }
    return (
        <div>
            <h1>Login Page</h1>

            <form action="/" method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username"/>
                </div>

                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="text" name="password" id="password"/>
                </div>

                <button type="submit" className={styles.login}>Log in</button>
            </form>
        </div>
    );
};

export default Login;