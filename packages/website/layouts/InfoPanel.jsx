import { Alert, AlertTitle, Button, Collapse, Fade, IconButton, Link, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { Box } from '@mui/system';
import { NoSsr } from '@mui/core';
import { useCallback, useEffect, useState } from 'react';
import { useStorage } from '../hooks/useStorage';

export const InfoPanel = () => {
    const [storedInfoState, setStoredInfoState] = useStorage('info', true);
    const [showInfoBt, setShowInfoBt] = useState(false);
    const [open, setOpen] = useState(true);

    // Initial setup with useStorage.
    // This is needed because of SSR that sets the value as the default initially.
    useEffect(() => {
        setOpen(storedInfoState);
        setShowInfoBt(!storedInfoState);
    }, []);

    useEffect(() => {
        setStoredInfoState(open);
    }, [open, setStoredInfoState]);

    const onExit = useCallback(() => {
        setShowInfoBt(!open);
    }, [open, setShowInfoBt]);

    const Text = ({ children }) => (
        <Typography variant="body" paragraph sx={{ my: 0.5 }}>
            {children}
        </Typography>
    );

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            <Fade appear={true} in={showInfoBt}>
                <Button
                    startIcon={<InfoIcon />}
                    size="small"
                    onClick={() => {
                        setShowInfoBt(false);
                        setOpen(true);
                    }}
                    sx={{
                        position: 'absolute',
                        right: 0,
                    }}
                >
                    More info
                </Button>
            </Fade>
            <Collapse appear={true} in={open} onExited={onExit}>
                <Alert
                    severity="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    <AlertTitle sx={{ mb: 1.5 }}>What is this?</AlertTitle>
                    <Text>
                        <strong>IsItBig.org</strong> is a website that tries to list every brands of major big
                        corporations.
                    </Text>
                    <Text>You can either search for a specific brand or navigate through the available groups.</Text>
                    <Text>
                        All the data comes from scraping the brands websites, so the data <strong>should</strong> be
                        accurate.
                    </Text>
                    <Text>
                        Everything is{' '}
                        <Link
                            href="https://github.com/yoannmoinet/isitbig.org"
                            variant="body2"
                            target="_blank"
                            rel="noopener"
                        >
                            open source and available on GitHub.
                        </Link>
                    </Text>
                </Alert>
            </Collapse>
        </Box>
    );
};
