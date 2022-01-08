import {Nav, Navbar} from 'rsuite';
import styles from '../styles/Nav.module.css';


const CustomNav = ({ active, onSelect, ...props }) => {
    return (
        <Nav {...props} activeKey={active} onSelect={onSelect} style={styles}>
        <Nav.Item 
            eventKey="internships" 
            >Internships</Nav.Item>
        <Nav.Item 
            eventKey="applications"
            >Applications</Nav.Item>
        </Nav>
    );
};

export default CustomNav;

