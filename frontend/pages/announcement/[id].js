import styles from '../../styles/components/announcements/View.module.css';
import { useRouter } from 'next/router';
import { Tag, TagGroup, Input, Button, Uploader, Divider } from 'rsuite';
import Candidate from '../../components/announcements/Candidate';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AnnouncementView = () => {
    const router = useRouter();
    const [user, setUser] = useState();
    const [listing, setListing] = useState();
    console.log(router.query);
    const { id } = router.query;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [faculty, setFaculty] = useState('');
    const [experience, setExperience] = useState('');

    useEffect(() => {
        const store = window.localStorage;
        const token = store.getItem('token');

        axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_BACKEND}/user/profile`,
            headers: {
                'x-access-token': token,
            },
        })
            .then((res) => {
                if (res.data) {
                    const userData = res.data;
                    setUser(userData);
                    setName(userData.name);
                    setEmail(userData.email);
                    setFaculty(userData.faculty);
                    setExperience(`Interests: ${userData.interests}`);
                    console.log(userData);
                }
            })
            .catch((err) => {
                console.log(err?.response);
                router.push('/login');
            });

        axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_BACKEND}/listing/${id}`,
            headers: {
                'x-access-token': token,
            },
        })
            .then((res) => {
                if (res.data) {
                    const listingData = res.data;
                    setListing(listingData);
                    console.log(listingData);
                }
            })
            .catch((err) => {
                console.log('Get listing err', err?.response, err);
            });
    }, []);

    return (
        <div className={styles.container}>
            {id}
            <div className={styles.header}>
                <div className={styles.half}>
                    <h2>{listing?.title}</h2>
                    {/* <TagGroup>
                        {listing &&
                            JSON.parse(listing?.keywords || null)
                                .split(',')
                                .map((key, i) => <Tag key={i}>{key}</Tag>)}
                    </TagGroup> */}
                    <p>
                        offered by <strong>{listing?.company}</strong>
                    </p>
                </div>

                <div className={styles.half}>
                    {/* <Button>Edit</Button>
                    <Button>Unpublish</Button> */}
                </div>
            </div>

            <div className={styles.section}>
                <ul>
                    <li>
                        <strong>Compensation</strong>:{' '}
                        {JSON.parse(listing?.salary || null)} RON/month
                    </li>
                    <li>
                        <strong>Remote</strong>:{' '}
                        {JSON.parse(listing?.remote || null) ? 'yes' : 'no'}
                    </li>
                    <li>
                        <strong>Experience</strong>:{' '}
                        {JSON.parse(listing?.experience || null)?.join(' - ')}{' '}
                        months
                    </li>
                    <li>
                        <strong>Duration</strong>: {listing?.duration} days
                    </li>
                    <li>
                        <strong>Ending date</strong>: {listing?.endingdate}
                    </li>
                    <li>
                        <strong>Last registration date</strong>:{' '}
                        {listing?.datelastregister}
                    </li>
                </ul>
            </div>

            {user?.type === 'student' && (
                <div className={styles.section}>
                    <h4>Apply</h4>
                    <form className={styles.apply_form}>
                        <Input
                            value={name}
                            onChange={setName}
                            className={styles.inputt}
                            placeholder={'Name'}
                        />
                        <Input
                            value={email}
                            onChange={setEmail}
                            className={styles.inputt}
                            placeholder={'E-mail'}
                        />
                        <Input
                            value={faculty}
                            onChange={setFaculty}
                            className={styles.inputt}
                            placeholder={'Faculty'}
                        />
                        <Input
                            value={experience}
                            onChange={setExperience}
                            as='textarea'
                            rows={3}
                            placeholder='Past experience'
                        />

                        <Uploader className={styles.uploader} listType='text'>
                            <Button color='blue' appearance='ghost'>
                                Upload documents
                            </Button>
                        </Uploader>
                        <Button
                            className={styles.button}
                            onClick={() =>
                                router.push({
                                    pathname: '/internships',
                                })
                            }
                        >
                            Apply
                        </Button>
                    </form>
                </div>
            )}
            {user?.type === 'recruiter' && (
                <div className={styles.section}>
                    <h4>Candidates</h4>

                    <Candidate />
                    <Candidate />
                    <Candidate />
                    <Candidate />
                </div>
            )}
        </div>
    );
};

export default AnnouncementView;
