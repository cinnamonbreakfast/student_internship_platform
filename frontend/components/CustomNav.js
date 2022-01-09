import { Nav, Navbar } from 'rsuite';
import styles from '../styles/Nav.module.css';
import { useRouter } from 'next/router';

const CustomNav = ({ active, ...props }) => {
    const router = useRouter();

    const onSelect = (data) => {
        console.log(data);
        router.push({
            pathname: `/${data}`,
        });
    };

    return (
        <Navbar {...props} style={styles}>
            <Nav.Item onSelect={onSelect} eventKey='announcements'>
                Internships
            </Nav.Item>

            <Nav pullRight onSelect={onSelect}>
                <Nav.Item eventKey='login'>Login</Nav.Item>
                <Nav.Item eventKey='register'>Register</Nav.Item>
            </Nav>
        </Navbar>
    );
};

export default CustomNav;
