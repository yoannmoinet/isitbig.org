import { Card, CardActionArea, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getImageSrc } from '../../utils';

export const Brand = ({ name, description, link, links, picture, bg, parent }) => {
    const pictureSrc = getImageSrc(picture);

    let brandEl = (
        <Card variant="elevation" elevation={2}>
            <CardActionArea>
                <Box
                    sx={{
                        background: bg || parent.bg || 'white',
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
                            padding: '15px',
                        }}
                    />
                </Box>
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
