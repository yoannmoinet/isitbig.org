import { Grid } from '@mui/material';
import { ThemeContext } from '@mui/styled-engine';
import * as React from 'react';
import { useContext } from 'react';
import { useBreakpoint } from '../../hooks/useBreakpoint';

export const Columns = ({ children, columns, defaultToMin }) => {
    const nbChildren = React.Children.count(children);
    const theme = useContext(ThemeContext);
    const breakpoint = useBreakpoint(theme.breakpoints.values);
    const nbColumns = defaultToMin ? Math.min(nbChildren, columns[breakpoint]) : columns[breakpoint];
    const cols = new Array(nbColumns);

    React.Children.forEach(children, (child, index) => {
        const col = index % nbColumns;
        cols[col] = cols[col] || [];
        cols[col].push(child);
    });

    // Convert columns to grid.
    const gridVals = {};
    for (const [key, val] of Object.entries(columns)) {
        gridVals[key] = Math.floor(12 / Math.min(nbColumns, val));
    }

    return (
        <Grid container spacing={2}>
            {cols.map((colChildren, index) => {
                return (
                    <Grid item key={index} {...gridVals}>
                        {colChildren}
                    </Grid>
                );
            })}
        </Grid>
    );
};
