import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Group } from '../../components/Group';
import { Brand } from '../../components/Group/Brand';

export const Brands = ({ brands }) => {
    return (
        <Grid container spacing={2}>
            {brands.map((brand) => {
                const description = `${Object.values(brand.brands).length} brands.`;
                return (
                    <Grid item xs={12} md={6} lg={3} key={brand.name}>
                        <Brand {...{ ...brand.details, description }} />
                    </Grid>
                );
            })}
        </Grid>
    );
};
