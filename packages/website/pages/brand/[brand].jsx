import { Button, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box } from '@mui/system';

import { Page } from '../../components/Page/index.jsx';
import { Brands } from '../../layouts/Brands.jsx';

const Brand = ({ data }) => {
    const router = useRouter();
    const { brand } = router.query;
    const groupObject = data.find((group) => group.details.slug === brand);
    if (!groupObject) {
        return null;
    }
    return (
        <Page title={groupObject.details.name}>
            <Link href="/" underline="none">
                <Button startIcon={<ArrowBackIosIcon />} size="large">
                    Back
                </Button>
            </Link>
            <Box sx={{ my: 4, mx: 'auto' }} maxWidth="xl">
                <Brands brands={Object.values(groupObject.brands)} masonry />
            </Box>
        </Page>
    );
};

export default Brand;
