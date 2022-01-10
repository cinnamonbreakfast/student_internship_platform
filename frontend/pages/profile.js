import { useEffect, useState } from 'react';
import {
    Button,
    IconButton,
    Input,
    Tag,
    TagGroup,
    Message,
    toaster,
} from 'rsuite';
import styles from '../styles/Profile.module.css';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [faculty, setFaculty] = useState('');
    const [interests, setInterests] = useState('');

    const [tags, setTags] = useState([]);
    const [typing, setTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');

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
                    setFaculty(userData.faculty);
                    setTags(userData.interests.split(', '));
                    console.log(userData);
                }
            })
            .catch((err) => {
                console.log(err?.response);
                router.push('/login');
            });
    }, []);

    const handleTagRemove = (tag) => {
        const nextTags = tags.filter((item) => item !== tag);
        setTags(nextTags);
    };

    const handleInputConfirm = () => {
        const nextTags = inputValue ? [...tags, inputValue] : tags;
        setTags(nextTags);
        setTyping(false);
        setInputValue('');
    };

    const handleButtonClick = () => {
        setTyping(true);
    };

    const renderInput = () => {
        if (typing) {
            return (
                <Input
                    className='tag-input'
                    size='xs'
                    style={{ width: 70 }}
                    value={inputValue}
                    onChange={setInputValue}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            );
        }

        return (
            <IconButton
                className={styles.tag_add_btn}
                onClick={handleButtonClick}
                icon={'+'}
                appearance='ghost'
                size='xs'
            />
        );
    };

    const submit = () => {
        const store = window.localStorage;
        const token = store.getItem('token');
        if (!token) {
            router.push('/login');
        }
        axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_BACKEND}/user/profile`,
            data: {
                email: user.email,
                name,
                faculty,
                interests: tags.join(', '),
            },
            headers: {
                'x-access-token': token,
            },
        })
            .then((res) => {
                const message = (
                    <Message type='success'>Profile was updated</Message>
                );
                toaster.push(message);
            })
            .catch((err) => {
                console.log(err);
                const message = (
                    <Message type='error'>
                        {err?.response?.data?.error ||
                            'Something weird happened.'}
                    </Message>
                );
                toaster.push(message);
            });
    };

    return (
        <div className={styles.container}>
            <h3>Profile edit</h3>
            <form>
                <Input
                    autoComplete='off'
                    value={user?.email || ''}
                    placeholder={'Email'}
                    disabled={true}
                />
                <Input
                    autoComplete='off'
                    value={name || ''}
                    onChange={(val) => setName(val)}
                    placeholder={'Full Name'}
                />
                <Input
                    autoComplete='off'
                    value={faculty || ''}
                    onChange={(val) => setFaculty(val)}
                    placeholder={'Faculty'}
                />
                <TagGroup className={styles.tags}>
                    {tags.map((item, index) => (
                        <Tag
                            key={index}
                            closable
                            onClose={() => handleTagRemove(item)}
                        >
                            {item}
                        </Tag>
                    ))}
                    {renderInput()}
                </TagGroup>
                <Button className={styles.button} onClick={submit}>
                    Update
                </Button>
            </form>
        </div>
    );
};

export default Profile;
