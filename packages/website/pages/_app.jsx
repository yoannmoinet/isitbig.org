import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Head>
                <title>Is it big?</title>
                <meta name="description" content="Is this brand part of a big corporation or group?" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
