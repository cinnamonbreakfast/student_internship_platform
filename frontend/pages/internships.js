import styles from '../styles/Internships.module.css';
import {Row, Col, Panel, active, setActive, Nav, Home} from 'rsuite';
import Card from '../components/Card.js'
import { useRouter } from 'next/router';

const Internships = () => {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <h3>Available internships</h3>
            <div className={styles.cards}>
                <Row className={styles.row}>
                <Col md={6} sm={12}>
                    <Card onClick={() => {
                        router.push({
                            pathname: '/internshipDetails',
                        })
                    }} />
                </Col>
                <Col md={6} sm={12}>
                    <Card />
                </Col>
                <Col md={6} sm={12}>
                    <Card />
                </Col>
                <Col md={6} sm={12}>
                    <Card />
                </Col>
                <Col md={6} sm={12}>
                    <Card />
                </Col> <Col md={6} sm={12}>
                    <Card />
                </Col> <Col md={6} sm={12}>
                    <Card />
                </Col> <Col md={6} sm={12}>
                    <Card />
                </Col> <Col md={6} sm={12}>
                    <Card />
                </Col> <Col md={6} sm={12}>
                    <Card />
                </Col> <Col md={6} sm={12}>
                    <Card />
                </Col> <Col md={6} sm={12}>
                    <Card />
                </Col>
                </Row>    
                
            </div>

           
        </div>
    );
};

export default Internships;

