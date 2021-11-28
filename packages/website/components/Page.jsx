import { Button, Container, Divider, Link } from '@mui/material';
import { Box } from '@mui/system';
import { Title } from './Title';
import EmojiFoodBeverageTwoToneIcon from '@mui/icons-material/EmojiFoodBeverageTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';

export const Page = ({ children, title }) => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ mt: 4, mb: 2, mx: 'auto' }} maxWidth="lg">
                <Title>{title ? title : 'Is it big?'}</Title>
            </Box>
            {children}
            <Divider sx={{ my: 10 }}>
                <Link href="https://ko-fi.com/yoannmoinet" target="_blank" rel="noreferrer,noopener" underline="none">
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        startIcon={<EmojiFoodBeverageTwoToneIcon />}
                        endIcon={<FavoriteTwoToneIcon sx={{ color: 'red' }} />}
                    >
                        Buy me a tea
                    </Button>
                </Link>
            </Divider>
        </Container>
    );
};
