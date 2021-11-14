import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';

export const Input = ({ setValue, value }) => {
    return (
        <FormControl fullWidth sx={{ mt: 10, mb: 20 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Name of brand</InputLabel>
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
                label="Name of brand"
            />
        </FormControl>
    );
};
