import { useEffect, useState } from 'react';
import { Grid, Fade, Grow, Link } from '@mui/material';
import { Box } from '@mui/system';
import Masonry from '@mui/lab/Masonry';
import slugify from '@sindresorhus/slugify';

import { Brand } from '../components/Group/Brand';

export const Brands = ({ brands }) => {
    const getElement = (brand, i) => {
        const delay = 250 + i * 50;
        return (
            <Fade in={true} style={{ transitionDelay: `${delay}ms` }} key={i}>
                {/* Box is needed for the Grow animation */}
                <Box>
                    <Brand {...brand} />
                </Box>
            </Fade>
        );
    };
    return (
        <Masonry
            columns={{
                xs: 1,
                sm: Math.min(brands.length, 2),
                md: Math.min(brands.length, 3),
                lg: Math.min(brands.length, 4),
                xl: Math.min(brands.length, 5),
            }}
        >
            {brands.map((brand, index) => getElement(brand, index))}
        </Masonry>
    );
};
