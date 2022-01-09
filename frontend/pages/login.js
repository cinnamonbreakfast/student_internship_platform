import { Input, Button, Message, toaster } from 'rsuite';
import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');

    const action = (event) => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_BACKEND}/register`,
            data: {
                email,
                password,
                type,
            },
        })
            .then((res) => {
                const message = (
                    <Message type='success'>
                        Welcome aboard! You are now a member.
                    </Message>
                );
                toaster.push(message);
                router.push({
                    pathname: '/',
                });
            })
            .catch((err) => {
                const message = (
                    <Message type='error'>
                        {err?.response?.data?.error ||
                            'Something weird happened.'}
                    </Message>
                );
                toaster.push(message);
            });
    };
    return (
        <div className={styles.container}>
            <h2>Welcome to student internship platform!</h2>
            <form className={styles.login_form}>
                <Input placeholder={'E-Mail'} />
                <Input type='password' placeholder={'Password'} />
                <Button
                    className={styles.button}
                    onClick={() =>
                        router.push({
                            pathname: '/editProfile',
                        })
                    }
                >
                    Login
                </Button>
                <h5>
                    New ? Click <a href='/register'>here</a> to sign up.
                </h5>
            </form>
        </div>
    );
};

export default Login;
