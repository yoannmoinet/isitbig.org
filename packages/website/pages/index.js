import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { merge } from 'lodash';

export default function Home({ groups }) {
    console.log('GROUPS', groups);
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Is it big?
                </Typography>
            </Box>
        </Container>
    );
}

export const getStaticProps = async () => {
    const data = await import('../assets/data.json');
    const override = await import('../assets/overrides.json');
    return {
        props: {
            groups: merge(data.default, override.default),
        },
    };
};
