import { useState } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Box,
  Card,
  Grid,
  Stack,
  Divider,
  // MenuItem,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import UserTable from 'src/components/table/UserTable';

import { CsvUpload } from '../../components/form/csv-upload';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const { register, handleSubmit } = useForm();
  const [users, setUsers] = useState([]);

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => console.log(data);
  const onInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const lines = reader.result.split('\n');
      const headers = lines[0].split(',');
      const userss = [];

      for (let i = 1; i < lines.length; i += 1) {
        const data = lines[i].split(',');
        const user = {};
        for (let j = 0; j < headers.length; j += 1) {
          user[headers[j].trim()] = data[j].trim();
        }
        userss.push(user);
      }
      setUsers(userss);
    };

    reader.readAsText(file);
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextField
              name="firstName"
              label="First Name"
              {...register('firstName')}
              sx={{ width: 1 }}
              required
              inputProps={{ minLength: 3, maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              name="lastName"
              label="Last Name"
              {...register('lastName')}
              sx={{ width: 1 }}
              required
              inputProps={{ minLength: 3, maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              name="phone"
              label="Phone"
              {...register('phone')}
              sx={{ width: 1 }}
              required
              inputProps={{ minLength: 10, maxLength: 10 }}
            />
          </Grid>
          {/* <Grid item xs={12} lg={6}>
            <TextField label="User Type" select {...register('type')} sx={{ width: 1 }}>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="client">Client</MenuItem>
            </TextField>
          </Grid> */}
          <Grid item xs={12} lg={6}>
            <TextField
              name="email"
              label="Email"
              {...register('email')}
              sx={{ width: 1 }}
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('password')}
              sx={{ width: 1 }}
            />
          </Grid>
        </Grid>
      </Box>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        sx={{ my: 3 }}
      >
        Register
      </LoadingButton>
    </form>
  );

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
      <Card
        sx={{
          width: 0.75,
          borderRadius: 0,
          background: '#F9FAFB',
          boxShadow: 0,
        }}
      >
        <Typography variant="h4" sx={{ my: 3 }}>
          Register a new user
        </Typography>
        {renderForm}

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            OR
          </Typography>
        </Divider>

        {users.length > 0 ? (
          <UserTable users={users} />
        ) : (
          <CsvUpload onInputChange={onInputChange} />
        )}
      </Card>
    </Stack>
  );
}
