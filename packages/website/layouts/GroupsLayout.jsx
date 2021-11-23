import { Grid } from '@mui/material';
import { Group } from '../../components/Group';

export const GroupsLayout = ({ groups }) => {
    return (
        <Grid container spacing={2}>
            {groups.map((group) => (
                <Grid item xs={12} md={6} lg={6} key={group.name}>
                    <Group group={group} />
                </Grid>
            ))}
        </Grid>
    );
};