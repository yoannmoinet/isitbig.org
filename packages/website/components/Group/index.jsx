import { Card, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Brand } from './Brand';

const Container = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    padding: 10,
}));

export const Group = ({ group }) => {
    const brands = Object.values(group.brands);
    return (
        <Container
            elevation={8}
            sx={{
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
            }}
        >
            <Typography gutterBottom variant="h5" component="div">
                {group.name}
            </Typography>
            {brands.map((brand) => {
                return (
                    <Brand
                        name={brand.name}
                        description={brand.description}
                        links={brand.links}
                        picture={brand.picture}
                        key={brand.name}
                    />
                );
            })}
        </Container>
    );
};
