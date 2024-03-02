import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query'; 
import { useRouter } from 'src/routes/hooks';

import UserService from 'src/services/User.service';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Box,
  Card,
  Grid,
  Stack,
  // Stack,
  Avatar,
  Divider,
  Container,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import PageHeader from 'src/components/pageHeader';
import BaseTable from 'src/components/table/BaseTable';

import { CsvUpload } from '../../../components/form/csv-upload';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const { register, handleSubmit } = useForm();
  const [users, setUsers] = useState([]);

  const router = useRouter(); 

  const [showPassword, setShowPassword] = useState(false);

  // const onSubmit = (data) => {
  //    try {
  //     console.log(data);
  //     mutate(data); 
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }

   const { mutate, isPending } = useMutation({
    mutationFn: (data) => 
      UserService.register({
        user: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: data.role,
        },
    }),
    onError: (err) => console.error(err),
    onSuccess: () => router.push('/user'),
  });

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
    <form onSubmit={handleSubmit(mutate)}>
      <Box sx={{ flexGrow: 1, px: 3, pt: 2 }}>
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
          <Grid item xs={12} lg={6}>
          <TextField
            name="role"
            required
            label="Role"
            select
            {...register('role')}
            sx={{ width: 1 }}
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
            <MenuItem value="CLIENT">CLIENT</MenuItem>
          </TextField>
        </Grid>
        </Grid>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          loading={isPending}
          variant="contained"
          color="inherit"
          sx={{ my: 3 }}
        >
          Register
        </LoadingButton>
      </Box>
    </form>
  );
  const tableFormat = [
    {
      label: 'First Name',
      accessor: ({ firstName, avatarUrl }) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={firstName} src={avatarUrl} />
          <Typography variant="subtitle2" noWrap>
            {firstName}
          </Typography>
        </Stack>
      ),
    },
    {
      label: 'Last Name',
      accessor: ({ lastName }) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {lastName}
          </Typography>
        </Stack>
      ),
    },
    { label: 'Phone', accessor: 'phone' },
    { label: 'Email', accessor: 'email' },
    {
      label: 'Verified',
      accessor: ({ isPhoneVerified, isEmailVerified }) =>
        isPhoneVerified === '1' && isEmailVerified === '1' ? 'Yes' : 'No',
    },
  ];

  console.log(users);

  return (
    <Container sx={{ mt: 3 }}>
      <PageHeader title="Users" />
      <Card>
        <Typography sx={{ fontWeight: 'bold', p: 3 }}>Add User Form</Typography>
        <Divider />
        {renderForm}

        <Divider>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            OR
          </Typography>
        </Divider>

        <Box sx={{ p: 3 }}>
          {users.length > 0 ? (
            <BaseTable tableData={users} tableDataFormat={tableFormat} />
          ) : (
            <CsvUpload onInputChange={onInputChange} />
          )}
        </Box>
      </Card>
    </Container>
  );
}
