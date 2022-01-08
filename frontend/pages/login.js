import { Input, Button } from 'rsuite';
import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <form className={styles.login_form}>
                <h2>Welcome</h2>
                <Input placeholder={'E-Mail'} />
                <Input type='password' placeholder={'Password'} />
                <Button
                    onClick={() =>
                        router.push({
                            pathname: '/',
                        })
                    }
                >
                    Default
                </Button>
            </form>
        </div>
    );
};

export default Login;
