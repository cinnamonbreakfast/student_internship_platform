import { Button, Divider } from 'rsuite';
import styles from '../../styles/components/Candidate.module.css';

const Candidate = () => {
    return (
        <>
            <div className={styles.card}>
                <ul>
                    <li>
                        <strong>Full name</strong>: John Doe
                    </li>
                    <li>
                        <strong>Email</strong>: Faculty
                    </li>
                    <li>
                        <strong>Faculty</strong>: John Doe
                    </li>
                    <li>
                        <strong>Experience</strong>: John Doe
                    </li>
                    <li>
                        <strong>Experience</strong>: John Doe
                    </li>
                </ul>

                <div className={styles.options}>
                    <Button color='red' appearance='primary'>
                        Reject
                    </Button>
                    <Button color='green' appearance='primary'>
                        Accept
                    </Button>
                </div>
            </div>
            <Divider />
        </>
    );
};

export default Candidate;
