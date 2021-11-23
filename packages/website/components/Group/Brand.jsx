import { Card, CardActionArea, CardContent, CardMedia, Grow, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { getImageSrc } from '../../utils';

export const Brand = ({ name, description, link, links, picture }) => {
    const pictureSrc = getImageSrc(picture);
    const [showPicture, setShowPicture] = useState(false);

    // It seems that image loading breaks masonry.
    // Handling the loading and adding some delay before rendering the pictures
    // seems to reduce the issue.
    useEffect(() => {
        const img = new Image();
        img.src = pictureSrc;
        img.onload = () => {
            setTimeout(() => {
                setShowPicture(true);
            }, 500);
        };
    });

    let brandEl = (
        <Card variant="elevation" elevation={2}>
            <CardActionArea>
                {showPicture ? (
                    <Box
                        sx={{
                            background: 'white',
                            padding: '5px',
                            minHeight: '100px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CardMedia
                            component="img"
                            alt={name}
                            image={pictureSrc}
                            sx={{
                                maxWidth: '100%',
                                margin: 'auto',
                                width: 'inherit',
                            }}
                        />
                    </Box>
                ) : null}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );

    if (link) {
        brandEl = (
            <Link href={link} underline="none">
                {brandEl}
            </Link>
        );
    }
    return brandEl;
};
