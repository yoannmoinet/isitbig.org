import { Alert, AlertTitle, Button, Collapse, Fade, IconButton, Link, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { Box } from '@mui/system';
import { useCallback, useState } from 'react';

export const InfoPanel = () => {
    const [open, setOpen] = useState(true);
    const [showInfo, setShowInfo] = useState(false);

    const onExit = useCallback(() => {
        setShowInfo(!open);
    }, [open]);

    const Text = ({ children }) => (
        <Typography variant="body" paragraph sx={{ my: 0.5 }}>
            {children}
        </Typography>
    );

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            <Fade in={showInfo}>
                <Button
                    startIcon={<InfoIcon />}
                    size="small"
                    onClick={() => {
                        setShowInfo(false);
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
            <Collapse in={open} onExit={onExit}>
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
