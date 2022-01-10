import { Input, Button, Message, toaster } from 'rsuite';
import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const action = (event) => {
        event.preventDefault();

        const storage = window.localStorage;

        axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_BACKEND}/login`,
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                storage.setItem('user', JSON.stringify(res.data));
                storage.setItem('token', res.data.token);
                const message = (
                    <Message type='success'>You are now logged in</Message>
                );
                toaster.push(message);
                router.push('/');
            })
            .catch((err) => {
                console.log(err);
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
                <Input
                    value={email || ''}
                    onChange={(val) => setEmail(val)}
                    placeholder={'E-Mail'}
                />
                <Input
                    value={password || ''}
                    onChange={(val) => setPassword(val)}
                    type='password'
                    placeholder={'Password'}
                />
                <Button className={styles.button} onClick={action}>
                    Login
                </Button>
                <h5>
                    New ? Click{' '}
                    <Link href='/register'>
                        <a>here</a>
                    </Link>{' '}
                    to sign up.
                </h5>
            </form>
        </div>
    );
};

export default Login;
