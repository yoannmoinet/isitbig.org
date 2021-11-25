import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import { useData } from '../hooks/useData';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GHBanner } from '../components/GHBanner';

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

function MyApp({ Component, pageProps, router }) {
    const data = useData();

    let head = (
        <Head>
            <title>Is it big?</title>
            <meta name="description" content="Is this brand part of a big corporation or group?" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
    );

    if (router.query?.brand) {
        const groupObject = data.find((group) => group.details.slug === router.query.brand);
        if (groupObject) {
            head = (
                <Head>
                    <title>{groupObject.details.name}</title>
                    <meta name="description" content="Is this brand part of a big corporation or group?" />
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
            );
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <GHBanner url="https://github.com/yoannmoinet/isitbig.org" />
            {head}
            {/* TODO Add animation here */}
            <Component {...{ ...{ data }, ...pageProps }} />
        </ThemeProvider>
    );
}

export default MyApp;
