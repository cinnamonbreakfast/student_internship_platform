import { Button, Divider } from 'rsuite';
import styles from '../../styles/components/Candidate.module.css';

const Candidate = ({ name, faculty, email, experience, motivation }) => {
    return (
        <>
            <div className={styles.card}>
                <ul>
                    <li>
                        <strong>Full name</strong>: {name}
                    </li>
                    <li>
                        <strong>Email</strong>: {email}
                    </li>
                    <li>
                        <strong>Faculty</strong>: {faculty}
                    </li>
                    <li>
                        <strong>Motivation</strong>: {motivation}
                    </li>
                </ul>

                <div className={styles.options}>
                    <Button color='red' appearance='primary'>
                        Reject
                    </Button>
                    <Button color='blue' appearance='ghost'>
                        Ask for more documents
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
