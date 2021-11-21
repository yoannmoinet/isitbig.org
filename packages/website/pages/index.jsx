import { Container, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { merge } from 'lodash';
import { useState } from 'react';
import { Input } from '../components/Input';
import { Title } from '../components/Title';
import { GroupsLayout } from '../layout/Home/groups';

export default function Home({ groups }) {
    const [search, setSearch] = useState('');
    return (
        <Container maxWidth="xl">
            <Box sx={{ my: 4, mx: 'auto' }} maxWidth="lg">
                <Title>Is it big?</Title>
            </Box>
            <Box sx={{ my: 4, mx: 'auto' }} maxWidth="lg">
                <Paper variant="elevation" elevation={12}>
                    <Typography variant="h5" component="h2">
                        What is this?
                    </Typography>
                </Paper>
            </Box>
            <Box sx={{ my: 4, mx: 'auto' }} maxWidth="md">
                <Input value={search} setValue={setSearch} />
            </Box>
            <Box sx={{ my: 4, mx: 'auto' }} maxWidth="xl">
                <GroupsLayout groups={groups} />
            </Box>
        </Container>
    );
}

export const getStaticProps = async () => {
    const data = await import('../public/data.json');
    const override = await import('../public/overrides.json');
    return {
        props: {
            groups: Object.values(merge(data.default, override.default)),
        },
    };
};
