import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Card, Stack, Button } from '@mui/material';

export default function UserFilter({ queryData, filterQuery, setFilterQuery }) {
  const { register, handleSubmit } = useForm();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleClearClick = () => {
    setFilterQuery({ phone: '', email: '' });
    setPhone('');
    setEmail('');
  };

  const onSubmit = (data) => {
    queryData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ minWidth: 300 }}>
        <Stack sx={{ padding: 3, gap: 2 }}>
          <Typography variant="h6" marginBottom="10px">
            Filters
          </Typography>
          <TextField
            value={phone}
            label="Search phone number"
            name="phone"
            {...register('phone')}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <TextField
            value={email}
            label="Search email"
            name="email"
            {...register('email')}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
            Apply
          </LoadingButton>
          {filterQuery && (
            <Button
              variant="outlined"
              onClick={handleClearClick}
              fullWidth
              size="large"
              color="inherit"
            >
              Clear Filter
            </Button>
          )}
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
