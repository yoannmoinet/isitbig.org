import { Box } from '@mui/system';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from '../components/Input';
import { throttle } from 'lodash';
import slugify from '@sindresorhus/slugify';
import { Brands } from './Brands';
import { Link } from '@mui/material';

const NON_CHARACTER = /[^a-zA-Z0-9 À-ÿ]/g;

export const Search = ({ data }) => {
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);

    const indexedData = useMemo(() => {
        return (
            data &&
            data.map((brand) => {
                const index = new Set();
                const name = brand.name.toLowerCase();
                const slug = slugify(name);

                index.add(name);
                index.add(name.replace(NON_CHARACTER, ''));
                index.add(name.replace(NON_CHARACTER, ' '));
                if (name.split(NON_CHARACTER).length) {
                    name.split(NON_CHARACTER).forEach((st) => index.add(st));
                }

                if (slug !== name) {
                    index.add(slug);
                    index.add(slug.replace(NON_CHARACTER, ''));
                    index.add(slug.replace(NON_CHARACTER, ' '));
                    if (slug.split(NON_CHARACTER).length) {
                        slug.split(NON_CHARACTER).forEach((st) => index.add(st));
                    }
                }

                return {
                    ...brand,
                    description: (
                        <Box>
                            from <Link href={`/brand/${brand.parent.slug}`}>{brand.parent.name}</Link>
                        </Box>
                    ),
                    indexes: Array.from(index).filter((st) => st.length > 2),
                };
            })
        );
    }, [data]);

    const updateFilter = useCallback(
        (query) => {
            console.log('Update filter', query);
            if (!query) {
                setFiltered([]);
                return;
            }
            const rx = new RegExp(`.*${query}.*`);
            setFiltered(
                indexedData.filter((brand) => {
                    for (const index of brand.indexes) {
                        if (rx.test(index)) {
                            return true;
                        }
                    }
                }),
            );
        },
        [setFiltered, indexedData],
    );

    const throttledUpdate = useMemo(() => {
        return throttle(updateFilter, 500);
    }, [updateFilter]);

    useEffect(() => {
        throttledUpdate(search);
    }, [search, updateFilter, throttledUpdate]);

    return (
        <Box maxWidth="xl">
            <Box sx={{ my: 4, mx: 'auto' }} maxWidth="md">
                <Input value={search} setValue={setSearch} />
            </Box>
            {filtered.length ? (
                <Box maxWidth="xl">
                    <Brands brands={filtered} />
                </Box>
            ) : null}
        </Box>
    );
};
