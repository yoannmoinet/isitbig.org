import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { Title } from '../Title';

export const Page = ({ children }) => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ my: 4, mx: 'auto' }} maxWidth="lg">
                <Title>Is it big?</Title>
            </Box>
            {children}
        </Container>
    );
};
