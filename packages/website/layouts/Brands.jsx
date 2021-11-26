import { Fade } from '@mui/material';
import { Box } from '@mui/system';

import { Brand } from '../components/Group/Brand';
import { Columns } from '../components/Columns';

export const Brands = ({ brands, noanim }) => {
    const getElement = (brand, i) => {
        const delay = 250 + i * 50;
        const elem = (
            <Box sx={{ mb: 2 }}>
                <Brand {...brand} />
            </Box>
        );
        return noanim ? (
            elem
        ) : (
            <Fade in={true} style={{ transitionDelay: `${delay}ms` }} key={i}>
                {elem}
            </Fade>
        );
    };

    return (
        <Columns columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }} defaultToMin>
            {brands.map((brand, index) => getElement(brand, index))}
        </Columns>
    );
};
