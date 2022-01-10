import { Nav, Navbar } from 'rsuite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CustomNav = ({ active, ...props }) => {
    const router = useRouter();
    const [user, setUser] = useState();

    const onSelect = (data) => {
        console.log(data);
        router.push({
            pathname: `/${data}`,
        });
    };

    useEffect(() => {
        const storage = window.localStorage;
        const userData = JSON.parse(storage.getItem('user') || null);
        if (userData) {
            setUser(userData);
        } else {
            setUser(userData);
        }
    }, [router.pathname]);

    console.log(user);

    return (
        <Navbar {...props}>
            <Nav.Item onSelect={onSelect} eventKey='announcement'>
                Internships
            </Nav.Item>

            {user ? (
                <Nav pullRight>
                    <Nav.Item onSelect={onSelect} eventKey='profile'>
                        Welcome, {user.name || user.email}
                    </Nav.Item>
                </Nav>
            ) : (
                <Nav pullRight onSelect={onSelect}>
                    <Nav.Item eventKey='login'>Login</Nav.Item>
                    <Nav.Item eventKey='register'>Register</Nav.Item>
                </Nav>
            )}
        </Navbar>
    );
};

export default CustomNav;
