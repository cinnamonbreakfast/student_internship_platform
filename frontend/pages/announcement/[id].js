import styles from '../../styles/components/announcements/View.module.css';
import { useRouter } from 'next/router';
import { Tag, TagGroup, Input, Button, Uploader, Divider } from 'rsuite';
import Candidate from '../../components/announcements/Candidate';

const AnnouncementView = () => {
    const router = useRouter();
    console.log(router.query);
    const { id } = router.query;
    return (
        <div className={styles.container}>
            {id}
            <div className={styles.header}>
                <div className={styles.half}>
                    <h2>Titlu announcement</h2>
                    <TagGroup>
                        <Tag>Text</Tag>
                        <Tag>Text</Tag>
                        <Tag>Text</Tag>
                        <Tag>Text</Tag>
                    </TagGroup>
                    <p>
                        offered by <strong>Company Name</strong>
                    </p>
                </div>

                <div className={styles.half}>
                    <Button>Edit</Button>
                    <Button>Unpublish</Button>
                </div>
            </div>

            <div className={styles.section}>
                <ul>
                    <li>
                        <strong>Compensation</strong>: 1000 RON/month
                    </li>
                    <li>
                        <strong>Remote</strong>: yes
                    </li>
                    <li>
                        <strong>Experience</strong>: not required
                    </li>
                    <li>
                        <strong>Duration</strong>: 3 months
                    </li>
                    <li>
                        <strong>Ending registration date</strong>: 10/10/2022
                    </li>
                    <li>
                        <strong>Last registration date</strong>: yesterday
                    </li>
                </ul>
            </div>

            <div className={styles.section}>
                <h4>Apply</h4>
                <form className={styles.apply_form}>
                    <Input className={styles.inputt} placeholder={'Name'} />
                    <Input
                        className={styles.inputt}
                        placeholder={'Last name'}
                    />
                    <Input className={styles.inputt} placeholder={'E-mail'} />
                    <Input className={styles.inputt} placeholder={'Faculty'} />
                    <Input
                        componentClass='textarea'
                        rows={3}
                        style={{ width: 1060, resize: 'auto' }}
                        placeholder='Past experience'
                    />

                    <Uploader className={styles.uploader} listType='text' />
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

            <div className={styles.section}>
                <h4>Candidates</h4>

                <Candidate />
                <Candidate />
                <Candidate />
                <Candidate />
            </div>
        </div>
    );
};

export default AnnouncementView;
