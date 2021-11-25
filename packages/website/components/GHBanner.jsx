import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useContext } from 'react';
import { ThemeContext } from '@mui/styled-engine';
import { useBreakpoint } from '../hooks/useBreakpoint';

export const GHBanner = ({ url }) => {
    const theme = useContext(ThemeContext);
    const isDark = theme.palette.mode === 'dark';
    const bgColor = isDark ? 'white' : 'black';
    const txtColor = isDark ? 'black' : 'white';
    const breakpoint = useBreakpoint(theme.breakpoints.values);

    console.log(breakpoint);

    const transforms = {
        xs: [`translate(-43%, -15%)`, `rotate(-45deg) scale(1)`],
        sm: [`translate(-40%, 0%)`, `rotate(-45deg) scale(1.5)`],
        md: [`translate(-35%, 65%)`, `rotate(-45deg) scale(0.8)`],
        lg: [`translate(-33%, 65%)`, `rotate(-40deg) scale(0.9)`],
        xl: [`translate(-20%, 90%)`, `rotate(-30deg) scale(1)`],
    };

    const showText = !['xs', 'sm'].includes(breakpoint);

    return (
        <Link
            href={url}
            rel="noopener,noreferrer"
            target="_blank"
            underline="none"
            color={txtColor}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                transformOrigin: '50% 50%',
                transform: transforms[breakpoint][0],
            }}
        >
            <Box
                sx={{
                    padding: '10px 100px',
                    background: bgColor,
                    transformOrigin: '50% 50%',
                    transform: transforms[breakpoint][1],
                }}
            >
                <Typography
                    variant="body2"
                    component="p"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                    }}
                >
                    <GitHubIcon sx={{ mr: showText ? 2 : 0 }} />
                    {showText ? <strong>Open in GitHub</strong> : null}
                </Typography>
            </Box>
        </Link>
    );
};
