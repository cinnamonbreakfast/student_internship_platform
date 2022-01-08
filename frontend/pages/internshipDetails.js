import { Input, Button,Toggle, Panel, ButtonToolbar } from 'rsuite';
import styles from '../styles/InternshipDetails.module.css';
import { useRouter } from 'next/router';

const InternshipDetails = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
           <Panel className={styles.panel} header="Company Name" shaded>

               <h2>Internship Title</h2>

               <ButtonToolbar className={styles.buttonToolbar}>
                    <Button>#Keyword1</Button>
                    <Button>#Keyword2</Button>
                    <Button>#Keyword3</Button>
                    <Button>#Keyword4</Button>
                </ButtonToolbar>

                <h4>Compensation: 10000RON/month</h4>
                <h4>Remote: yes</h4>
                <h4>Experience: not requiered</h4>
                <h4>Duration: 3 months</h4>
                <h4>Ending registration date: 10/10/2022</h4>
                <h4>Last registration date: yesterday</h4>



                <Button className={styles.button} appearance="default" block onClick={() =>
                        router.push({
                            pathname: '/apply',
                        })
                    }>Apply</Button>
            </Panel>
        </div>
    );
};

export default InternshipDetails;
