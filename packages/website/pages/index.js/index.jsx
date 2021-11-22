import { Container, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Input } from '../../components/Input';
import { Page } from '../../components/Page/index.jsx';
import { useData } from '../../hooks/useData';
import { Brands } from './Brands';
import { InfoPanel } from './InfoPanel';

export default function Home({ groups }) {
    const [search, setSearch] = useState('');
    const data = useData();
    return (
        <Page>
            <Box sx={{ my: 4, mx: 'auto' }} maxWidth="lg">
                <InfoPanel />
            </Box>
            <Box sx={{ my: 4, mx: 'auto' }} maxWidth="md">
                <Input value={search} setValue={setSearch} />
            </Box>
            <Divider textAlign="left">
                <Typography variant="h5" component="h2">
                    Available organisations
                </Typography>
            </Divider>
            <Box sx={{ my: 4, mx: 'auto' }} maxWidth="xl">
                <Brands brands={data} />
            </Box>
        </Page>
    );
}
