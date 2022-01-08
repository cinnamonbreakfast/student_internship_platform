import { Input, Button, Panel, Uploader } from 'rsuite';
import styles from '../styles/Apply.module.css';
import { useRouter } from 'next/router';

const Apply = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <Panel className={styles.panel} header="Company Name" shaded>
                <form className={styles.apply_form}>
                    <h2>Internship Title</h2>
                    <Input className={styles.inputt} placeholder={'Name'} />
                    <Input className={styles.inputt} placeholder={'Last name'} />
                    <Input className={styles.inputt} placeholder={'E-mail'} />
                    <Input className={styles.inputt} placeholder={'Faculty'} />
                    <Input
                        componentClass="textarea"
                        rows={3}
                        style={{ width: 1060, resize: 'auto' }}
                        placeholder="Past experience"
                        />

                    <Uploader className={styles.uploader} listType="text" />
                    <Button className={styles.button}
                        onClick={() =>
                            router.push({
                                pathname: '/internships',
                            })
                        }
                    >
                        Apply
                    </Button>

                </form>
            </Panel>
           
        </div>
    );
};

export default Apply;
