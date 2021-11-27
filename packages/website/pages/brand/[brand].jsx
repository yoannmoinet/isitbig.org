import { Button, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';

import { Page } from '../../components/Page.jsx';
import { Brands } from '../../layouts/Brands.jsx';
import { getImageSrc } from '../../utils/index.js';

const Brand = ({ data }) => {
    const router = useRouter();
    const { brand } = router.query;
    const group = data.find((g) => g.details.slug === brand);
    if (!group) {
        return null;
    }
    const logoSrc = getImageSrc(group.details.picture);
    return (
        <Page title={group.details.name}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" underline="none">
                    <Button startIcon={<ArrowBackIosIcon />}>Back</Button>
                </Link>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'block', position: 'relative' }}>
                        <Image src={logoSrc} alt={group.details.name} layout="fill" />
                    </Box>
                    <Typography variant="body1" sx={{ mr: 3 }}>
                        {Object.values(group.brands).length} brands.
                    </Typography>
                    <Link
                        href={group.details.url}
                        underline="none"
                        target="_blank"
                        rel="noreferrer,noopener,nofollow"
                        sx={{ mx: 3 }}
                    >
                        <Button startIcon={<LanguageTwoToneIcon />}>Website</Button>
                    </Link>
                    <Link
                        href={group.details.infoUrl}
                        underline="none"
                        target="_blank"
                        rel="noreferrer,noopener,nofollow"
                        sx={{ ml: 3 }}
                    >
                        <Button startIcon={<InfoIcon />}>Wikipedia</Button>
                    </Link>
                </Box>
            </Box>
            <Box sx={{ my: 4, mx: 'auto' }} maxWidth="xl">
                <Brands
                    brands={Object.values(group.brands).map((b) => {
                        b.parent = group.details;
                        return b;
                    })}
                />
            </Box>
        </Page>
    );
};

export default Brand;
