import Card from '../../components/announcements/Card';
import styles from '../../styles/Listing.module.css';

const Listing = () => {
    return (
        <div className={styles.container}>
            <h1>Announcements</h1>

            <div className={styles.list}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default Listing;
