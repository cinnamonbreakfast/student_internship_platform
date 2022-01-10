import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../../components/announcements/Card';
import styles from '../../styles/Listing.module.css';

const Listing = () => {
    const [posts, setPosts] = useState();

    useEffect(() => {
        const store = window.localStorage;
        const token = store.getItem('token');
        axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_BACKEND}/listings`,
            headers: {
                'x-access-token': token,
            },
        }).then((res) => {
            console.log(res.data);
            setPosts(res.data);
        });
    }, []);

    return (
        <div className={styles.container}>
            <h1>Announcements</h1>

            <div className={styles.list}>
                {posts?.map((post) => (
                    <Card {...post} />
                ))}
            </div>
        </div>
    );
};

export default Listing;
