import { useState } from 'react';
import { Input, Button, Toggle, Message, toaster, Form } from 'rsuite';
import styles from '../styles/Register.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';

const Register = () => {
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
            <form onSubmit={action} className={styles.register_form}>
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
                <Toggle
                    className={styles.myToggle}
                    checkedChildren='Recruiter'
                    unCheckedChildren='Student'
                    onChange={(check) =>
                        setType(check ? 'recruiter' : 'student')
                    }
                ></Toggle>
                <div></div>
                <Button onClick={action} className={styles.button}>
                    Sign Up
                </Button>
            </form>
            <h5>
                Already have an account ? Click <a href='/login'>here</a> to
                login.
            </h5>
        </div>
    );
};

export default Register;
