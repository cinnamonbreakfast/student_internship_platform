import { Input, Button,Toggle } from 'rsuite';
import styles from '../styles/Register.module.css';
import { useRouter } from 'next/router';

const Register = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <h2>Welcome to student internship platform!</h2>
            <form className={styles.register_form}>
                <Input placeholder={'E-Mail'} />
                <Input type='password' placeholder={'Password'} />
                <Toggle className={styles.myToggle} checkedChildren="Recruiter" unCheckedChildren="Student">
                </Toggle>
                <div></div>
                <Button className={styles.button}
                    onClick={() =>
                        router.push({
                            pathname: '/editProfile',
                        })
                    }>
                    Sign Up
                </Button>
            </form>
            <h5>Already have an account ? Click <a href='/login'>here</a> to login.</h5>
        </div>
    );
};

export default Register;
