import styles from '../../styles/components/announcements/Card.module.css';
import { Button } from 'rsuite';
import Link from 'next/link';

const Card = ({
    company,
    description,
    experience,
    id,
    remote,
    salary,
    title,
}) => {
    const [ex1, ex2] = JSON.parse(experience);

    return (
        <div className={styles.card}>
            <h2>
                <Link href={`/announcement/${id}`}>
                    <a>{title}</a>
                </Link>
            </h2>
            <p>posted by {company}</p>

            <ul className={styles.perks}>
                <li>
                    Experience: {ex1} - {ex2} months
                </li>
                <li>Salary: {JSON.parse(salary)} RON/month</li>
                <li>Remote: {JSON.parse(remote) ? 'yes' : 'no'}</li>
            </ul>

            <p>{description}</p>

            <div className={styles.controlls}>
                <Link href={`/announcement/${id}`}>
                    <Button>Apply</Button>
                </Link>
            </div>
        </div>
    );
};

export default Card;
