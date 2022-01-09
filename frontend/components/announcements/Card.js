import styles from '../../styles/components/announcements/Card.module.css';
import { Button } from 'rsuite';
import Link from 'next/link';

const Card = () => {
    return (
        <div className={styles.card}>
            <h2>
                <Link href='/'>
                    <a>Cool announcement title right here long</a>
                </Link>
            </h2>
            <p>posted by Some Inc.</p>

            <ul className={styles.perks}>
                <li>Experience: Beginner</li>
                <li>Salary: $500 monthly</li>
                <li>Remote</li>
            </ul>

            <p>
                THis is the job description that is meant to be limited and not
                reach more than two lines...
            </p>

            <div className={styles.controlls}>
                <Button>Apply</Button>
            </div>
        </div>
    );
};

export default Card;
