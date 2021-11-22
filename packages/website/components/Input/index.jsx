import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';

export const Input = ({ setValue, value }) => {
    return (
        <FormControl fullWidth sx={{ mt: 5, mb: 10 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Search for a brand</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                value={value}
                onChange={(evt) => {
                    setValue(evt.target.value);
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <CategoryTwoToneIcon />
                    </InputAdornment>
                }
                label="Search for a brand"
            />
        </FormControl>
    );
};
