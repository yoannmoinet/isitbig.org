import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { Title } from './Title';

export const Page = ({ children, title }) => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ mt: 4, mb: 2, mx: 'auto' }} maxWidth="lg">
                <Title>{title ? title : 'Is it big?'}</Title>
            </Box>
            {children}
        </Container>
    );
};
