import 'rsuite/dist/rsuite.min.css';
import CustomNav from '../components/CustomNav';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <CustomNav />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
