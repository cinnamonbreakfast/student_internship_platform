import { Input, Button } from 'rsuite';
import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <h2>Welcome to student internship platform!</h2>
            <form className={styles.login_form}>
                <Input placeholder={'E-Mail'} />
                <Input type='password' placeholder={'Password'} />
                <Button className={styles.button}
                    onClick={() =>
                        router.push({
                            pathname: '/editProfile',
                        })
                    }
                >
                    Login
                </Button>
                <h5>New ? Click <a href='/register'>here</a> to sign up.</h5>
            </form>
        </div>
    );
};

export default Login;
