import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const Brand = ({ name, description, links, picture }) => {
    const pictureSrc = `./${picture.split('/').slice(3).join('/')}`;
    return (
        <Card sx={{ maxWidth: 345 }} variant="elevation" elevation={2}>
            <Box
                sx={{
                    background: 'white',
                    padding: '5px',
                }}
            >
                <CardMedia
                    component="img"
                    alt={name}
                    image={pictureSrc}
                    sx={{
                        maxWidth: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 'inherit',
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
            <CardActions>
                <Button size="small">Link</Button>
            </CardActions>
        </Card>
    );
};
