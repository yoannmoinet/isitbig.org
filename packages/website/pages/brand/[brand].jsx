import { Button, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Page } from '../../components/Page/index.jsx';

import { useData } from '../../hooks/useData.js';

const Brand = () => {
    const router = useRouter();
    const { brand } = router.query;
    const data = useData();
    const groupObject = data.find((group) => group.name === brand);
    console.log(groupObject);
    return (
        <Page>
            <Link href="/" underline="none">
                <Button startIcon={<ArrowBackIosIcon />} size="large">
                    Back
                </Button>
            </Link>
            <Typography variant="body1">{brand}</Typography>
        </Page>
    );
};

export default Brand;
