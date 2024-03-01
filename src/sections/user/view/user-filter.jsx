import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function UserFilter() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ minWidth: 300 }}>
        <Stack sx={{ padding: 3, gap: 2 }}>
          <Typography variant="h6" marginBottom="10px">
            Filters
          </Typography>

          <TextField label="Search phone number" name="phone" {...register('phone')} />
          <TextField label="Search email" name="email" {...register('email')} />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
            Apply
          </LoadingButton>
        </Stack>
      </Card>
    </form>
  );
}

// UserTableFilter.propTypes = {
//   tableData: PropTypes.array.isRequired,
//   filterOptions: PropTypes.shape({
//     companyName: PropTypes.string.isRequired,
//     role: PropTypes.string.isRequired,
//     isVerified: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//   }).isRequired,
//   onFilterChange: PropTypes.func,
// };
