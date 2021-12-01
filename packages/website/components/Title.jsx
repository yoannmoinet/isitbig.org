import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { Button, Divider, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';

export const Title = ({ children }) => {
    const router = useRouter();
    console.log(router);
    const needBack = router.route !== '/';
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {needBack ? (
                <Box sx={{ flexGrow: 0, mr: 1 }}>
                    <Link href="/" underline="none">
                        <Button startIcon={<ArrowBackIos />}>Back</Button>
                    </Link>
                </Box>
            ) : null}
            <Box sx={{ flexGrow: 1 }}>
                <Divider>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {children}
                    </Typography>
                </Divider>
            </Box>
        </Box>
    );
};
