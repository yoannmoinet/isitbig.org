import { useEffect, useState } from 'react';
import { Grid, Fade, Grow, Link } from '@mui/material';
import { Brand } from '../../components/Group/Brand';
import { Box } from '@mui/system';
import slugify from '@sindresorhus/slugify';

export const Brands = ({ brands }) => {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        const i = 0;
        const interval = setInterval(() => {
            setShows((prev) => {
                const ar = [...prev];
                ar[i] = true;
                return ar;
            });
            if (i >= brands.length) {
                clearInterval(interval);
            } else {
                i += 1;
            }
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <Grid container spacing={2}>
            {brands.map((brand, index) => {
                const description = `${Object.values(brand.brands).length} brands.`;
                return (
                    <Grid item xs={12} md={6} lg={3} key={brand.name}>
                        <Grow in={shows[index]} timeout={500}>
                            <Link href={`/brand/${brand.name}`} underline="none">
                                <Brand {...{ ...brand.details, description }} />
                            </Link>
                        </Grow>
                    </Grid>
                );
            })}
        </Grid>
    );
};
