import { Container, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo, useState } from 'react';
import { Input } from '../components/Input';
import { Page } from '../components/Page';
import { Brands } from '../layouts/Brands';
import { InfoPanel } from '../layouts/InfoPanel';
import { Search } from '../layouts/Search';

export default function Home({ data }) {
    const searchableData = useMemo(() => {
        const d = [];
        for (const group of data) {
            d.push(
                ...Object.values(group.brands).map((brand) => {
                    return {
                        ...brand,
                        parent: group.details,
                    };
                }),
            );
        }
        return d;
    }, [data]);

    return (
        <Page>
            <Box sx={{ my: 4, mx: 'auto' }} maxWidth="lg">
                <InfoPanel />
            </Box>
            <Box maxWidth="xl">
                <Search data={searchableData} />
            </Box>
            <Divider textAlign="left">
                <Typography variant="h5" component="h2">
                    Available organisations
                </Typography>
            </Divider>
            <Box sx={{ my: 4, mx: 'auto' }} maxWidth="xl">
                <Brands
                    brands={data.map((b) => {
                        b.details.description = `${Object.values(b.brands).length} brands.`;
                        b.details.link = `/brand/${b.details.slug}`;
                        return b.details;
                    })}
                />
            </Box>
        </Page>
    );
}
