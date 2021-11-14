import { Divider, Typography } from "@mui/material";

export const Title = ({ children }) => {
    return <Divider>
        <Typography variant="h4" component="h1" gutterBottom>
            {children}
        </Typography>
    </Divider>;
}
