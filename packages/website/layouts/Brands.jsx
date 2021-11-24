import { Fade } from '@mui/material';
import { NoSsr } from '@mui/core';
import { Box } from '@mui/system';

import { Brand } from '../components/Group/Brand';
import { Columns } from '../components/Columns';

export const Brands = ({ brands }) => {
    const getElement = (brand, i) => {
        const delay = 250 + i * 50;
        return (
            <Fade in={true} style={{ transitionDelay: `${delay}ms` }} key={i}>
                {/* Box is needed for the animation */}
                <Box sx={{ mb: 2 }}>
                    <Brand {...brand} />
                </Box>
            </Fade>
        );
    };

    return (
        <NoSsr>
            <Columns columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }} defaultToMin>
                {brands.map((brand, index) => getElement(brand, index))}
            </Columns>
        </NoSsr>
    );
};
