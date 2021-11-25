import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useContext } from 'react';
import { ThemeContext } from '@mui/styled-engine';

export const GHBanner = ({ url }) => {
    const theme = useContext(ThemeContext);
    const isDark = theme.palette.mode === 'dark';
    const bgColor = isDark ? 'white' : 'black';
    const txtColor = isDark ? 'black' : 'white';

    return (
        <Link
            href={url}
            rel="noopener,noreferrer"
            target="_blank"
            underline="none"
            color={txtColor}
            sx={{
                position: 'fixed',
                left: '-80px',
                top: '40px',
                transform: 'rotate(-30deg)',
            }}
        >
            <Box
                sx={{
                    padding: '10px 100px',
                    background: bgColor,
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
                    <GitHubIcon sx={{ mr: 2 }} />
                    <strong>Open in GitHub</strong>
                </Typography>
            </Box>
        </Link>
    );
};
