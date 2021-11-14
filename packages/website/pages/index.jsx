import { Container, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { merge } from 'lodash';
import { useState } from 'react';
import { Input } from '../components/Input';
import { Title } from '../components/Title';
import { GroupsLayout } from '../layout/Home/groups';

export default function Home({ groups }) {
    const [search, setSearch] = useState('');
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Title>Is it big?</Title>
            </Box>
            <Box sx={{ my: 4 }}>
                <Input value={search} setValue={setSearch} />
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
